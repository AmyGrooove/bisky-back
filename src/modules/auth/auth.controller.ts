import { Controller, Request, Post, UseGuards, Get, Body } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AccessTokenGuard } from "./guards/accessToken.guard"
import { RefreshTokenGuard } from "./guards/refreshToken.guard"
import { LoginUserDto } from "../user/dto/login-user.dto"
import { CreateUserDto } from "../user/dto/create-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get("logout")
  logout(@Request() req) {
    return this.authService.logout(req.user.id)
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  refreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user.id, req.user.refreshToken)
  }
}
