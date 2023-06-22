import {
  Controller,
  UseGuards,
  Get,
  Request,
  Param,
  BadRequestException,
} from "@nestjs/common"
import { AccessTokenGuard } from "../auth/guards/accessToken.guard"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get("whoami")
  getUserJWT(@Request() req) {
    return this.userService.findById(req.user.id)
  }

  @Get("profile/:username")
  getUser(@Param("username") username: string) {
    const user = this.userService.findByUsername(username)

    if (!user) throw new BadRequestException("User does not exist")

    return user
  }
}
