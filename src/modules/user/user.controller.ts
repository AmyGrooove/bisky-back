import {
  Controller,
  UseGuards,
  Get,
  Request,
  Param,
  BadRequestException,
} from "@nestjs/common"
import { AccessTokenGuard } from "../auth/guards/accessToken.guard"
import { UserService } from "./services/user.service"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get("whoami")
  whoami(@Request() req) {
    return this.userService.findPublicById(req.user.id)
  }

  @Get("profile/:username")
  getUser(@Param("username") username: string) {
    const user = this.userService.findByUsername(username)

    if (!user) throw new BadRequestException("User does not exist")

    return user
  }
}
