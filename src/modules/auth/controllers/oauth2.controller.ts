import {
  Controller,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { UserService } from "../../user/services/user.service"
import { AuthService } from "../services/auth.service"

@ApiTags("Auth")
@UseInterceptors(CacheInterceptor)
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
  googleLoginCallback(@Request() req) {
    return req.user
  }
}

export { OAuth2Controller }
