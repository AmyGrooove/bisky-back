import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "../users/dto/create-user.dto"
import { ObjectId } from "mongoose"
import { UsersService } from "../users/users.service"
import { LoginUserDto } from "../users/dto/login-user.dto"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(data: CreateUserDto) {
    const userExists = await this.usersService.findByUsername(data.username)
    if (userExists) {
      throw new BadRequestException("User already exists")
    }

    const hash = await this.hashData(data.password)
    const newUser = await this.usersService.create({
      ...data,
      password: hash,
    })

    const tokens = await this.getTokens(newUser._id, newUser.username)
    await this.updateRefreshToken(newUser._id, tokens.refreshToken)

    return tokens
  }

  async login(data: LoginUserDto) {
    const user = await this.usersService.findByUsername(data.username)
    if (!user) throw new BadRequestException("User does not exist")

    const fullUser = await this.usersService.findById(user._id)

    const passwordMatches = await bcrypt.compare(
      data.password,
      fullUser.password,
    )
    if (!passwordMatches) throw new BadRequestException("Password is incorrect")

    const tokens = await this.getTokens(fullUser._id, fullUser.username)
    await this.updateRefreshToken(fullUser._id, tokens.refreshToken)

    return tokens
  }

  async logout(userId: ObjectId) {
    const user = await this.usersService.findById(userId)

    if (user.refreshToken === null) throw new BadRequestException("Already out")

    this.usersService.update(userId, { refreshToken: null })

    return true
  }

  async refreshTokens(userId: ObjectId, refreshToken: string) {
    const user = await this.usersService.findById(userId)

    if (!user || !user.refreshToken)
      throw new ForbiddenException(
        "The user is not present or is not authorised",
      )

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    )

    if (!refreshTokenMatches)
      throw new ForbiddenException("Tokens do not match")

    const tokens = await this.getTokens(user._id, user.username)
    await this.updateRefreshToken(user._id, tokens.refreshToken)

    return tokens
  }

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  async updateRefreshToken(userId: ObjectId, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken })
  }

  async getTokens(userId: ObjectId, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "30s",
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "5m",
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
