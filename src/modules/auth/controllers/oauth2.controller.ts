import { Controller, UseGuards, Get, Req } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"

import { UserService } from "../../user/services/user.service"
import { AuthService } from "../services/auth.service"

@ApiTags("Auth")
@Controller("auth")
class OAuth2Controller {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleLoginCallback(@Req() req) {
    return req.user
  }
}

export { OAuth2Controller }
