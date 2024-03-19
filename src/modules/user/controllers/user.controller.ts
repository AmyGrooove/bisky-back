import { Controller, UseGuards, Get, Request, HttpStatus } from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { UserService } from "../services/user.service"
import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { User } from "../schemas/user.schema"

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: "Check access-token" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get("whoami")
  async whoami(@Request() req) {
    await this.userService.updateUser({
      _id: req.user._id,
      updateUserDto: { lastOnlineDate: new Date() },
    })
    return this.userService.findPublicUserData({ _id: req.user._id })
  }
}
