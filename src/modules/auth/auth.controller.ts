import { Controller, Request, Post, UseGuards, Get, Body } from "@nestjs/common"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { CreateUserDto } from "./dto/create-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post("/register")
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  getProfile(@Request() req) {
    return this.authService.getUserInfo(req.user.userId)
  }
}
