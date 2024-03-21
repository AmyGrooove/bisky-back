import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpStatus,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AccessTokenGuard } from "./guards/accessToken.guard"
import { RefreshTokenGuard } from "./guards/refreshToken.guard"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { UserService } from "../user/services/user.service"
import { User } from "../user/schemas/user.schema"
import { CreateUserDto } from "./dto/createUser.dto"
import { LoginUserDto } from "./dto/loginUser.dto"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get("logout")
  logout(@Request() req) {
    return this.authService.logout(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  refreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user.id, req.user.refreshToken)
  }

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
