import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { compare, hash } from "bcryptjs"

import { UserService } from "../../user/services/user.service"
import { CreateUserDto } from "../dto/createUser.dto"
import { LoginUserDto } from "../dto/loginUser.dto"

@Injectable()
class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async register(query: CreateUserDto) {
    if (
      await this.userService.findPublicUserData({ username: query.username })
    ) {
      throw new BadRequestException("Username taken")
    }

    if (await this.userService.findPublicUserData({ email: query.email })) {
      throw new BadRequestException("Email taken")
    }

    const passwordHash = await hash(query.password, 10)
    const newUser = await this.userService.createNewUser({
      ...query,
      password: passwordHash,
    })

    const tokens = await this.getTokens({
      userId: newUser._id.toString(),
      username: newUser.username,
    })
    await this.updateRefreshToken({
      userId: newUser._id.toString(),
      refreshToken: tokens.refreshToken,
    })

    return { ...tokens, _id: newUser._id }
  }

  async login(query: LoginUserDto) {
    const user = await this.userService.findPublicUserData({
      username: query.username,
    })
    if (!user) throw new BadRequestException("User does not exist")

    const fullUser = await this.userService.findFullUserById(
      user._id.toString(),
    )

    if (!(await compare(query.password, fullUser.passwordHash)))
      throw new BadRequestException("Password is incorrect")

    const tokens = await this.getTokens({
      userId: fullUser._id.toString(),
      username: fullUser.username,
    })
    await this.updateRefreshToken({
      userId: fullUser._id.toString(),
      refreshToken: tokens.refreshToken,
    })

    return { ...tokens, _id: fullUser._id }
  }

  async logout(userId: string) {
    const user = await this.userService.findFullUserById(userId)

    if (user.refreshToken === null) throw new BadRequestException("Already out")

    this.userService.updateUser({
      _id: userId,
      updateUserDto: { refreshToken: null },
    })

    return true
  }

  async refreshTokens(query: { userId: string; refreshToken: string }) {
    const { userId, refreshToken } = query

    const user = await this.userService.findFullUserById(userId)

    if (!user) throw new BadRequestException("User does not exist")
    if (!user.refreshToken)
      throw new BadRequestException("User is not authorized")

    if (!(await compare(refreshToken, user.refreshToken)))
      throw new ForbiddenException("Tokens do not match")

    const tokens = await this.getTokens({
      userId: user._id.toString(),
      username: user.username,
    })
    await this.updateRefreshToken({
      userId: user._id.toString(),
      refreshToken: tokens.refreshToken,
    })

    return tokens
  }

  async updateRefreshToken(query: { userId: string; refreshToken: string }) {
    const { userId, refreshToken } = query

    const hashedRefreshToken = await hash(refreshToken, 10)
    await this.userService.updateUser({
      _id: userId,
      updateUserDto: {
        refreshToken: hashedRefreshToken,
        lastOnlineDate: new Date(),
      },
    })
  }

  async getTokens(query: { userId: string; username: string }) {
    const { userId, username } = query

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id: userId, username },
        {
          secret: this.configService.get("JWT_ACCESS_SECRET"),
          expiresIn: "10m",
        },
      ),
      this.jwtService.signAsync(
        { _id: userId, username },
        {
          secret: this.configService.get("JWT_REFRESH_SECRET"),
          expiresIn: "180d",
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}

export { AuthService }
