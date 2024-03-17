import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { ObjectId } from "mongoose"
import { ConfigService } from "@nestjs/config"
import { emailValidation, usernameValidation } from "./types"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { LoginUserDto } from "../user/dto/login-user.dto"
import { UserService } from "../user/services/user.service"

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async register(data: CreateUserDto) {
    if (!emailValidation.test(data.email))
      throw new BadRequestException("Incorrect email")
    if (!usernameValidation.test(data.username))
      throw new BadRequestException("Incorrect username")
    if (data.password.length < 4)
      throw new BadRequestException("The password is small")

    const userExists = await this.userService.findByUsername(data.username)
    if (userExists) {
      throw new BadRequestException("User already exists")
    }

    const hash = await this.hashData(data.password)
    const newUser = await this.userService.create({
      ...data,
      password: hash,
    })

    const tokens = await this.getTokens(
      newUser._id as unknown as ObjectId,
      newUser.username,
    )
    await this.updateRefreshToken(
      newUser._id as unknown as ObjectId,
      tokens.refreshToken,
    )

    return tokens
  }

  async login(data: LoginUserDto) {
    if (!usernameValidation.test(data.username))
      throw new BadRequestException("Incorrect username")
    if (data.password.length < 4)
      throw new BadRequestException("The password is small")

    const user = await this.userService.findByUsername(data.username)
    if (!user) throw new BadRequestException("User does not exist")

    const fullUser = await this.userService.findById(
      user._id as unknown as ObjectId,
    )

    const passwordMatches = await bcrypt.compare(
      data.password,
      fullUser.passwordHash,
    )
    if (!passwordMatches) throw new BadRequestException("Password is incorrect")

    const tokens = await this.getTokens(
      fullUser._id as unknown as ObjectId,
      fullUser.username,
    )
    await this.updateRefreshToken(
      fullUser._id as unknown as ObjectId,
      tokens.refreshToken,
    )

    return tokens
  }

  async logout(userId: ObjectId) {
    const user = await this.userService.findById(userId)

    if (user.refreshToken === null) throw new BadRequestException("Already out")

    this.userService.update(userId, { refreshToken: null })

    return true
  }

  async refreshTokens(userId: ObjectId, refreshToken: string) {
    const user = await this.userService.findById(userId)

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

    const tokens = await this.getTokens(
      user._id as unknown as ObjectId,
      user.username,
    )
    await this.updateRefreshToken(
      user._id as unknown as ObjectId,
      tokens.refreshToken,
    )

    return tokens
  }

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  async updateRefreshToken(userId: ObjectId, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.userService.update(userId, { refreshToken: hashedRefreshToken })
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
          expiresIn: "1d",
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "30d",
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
