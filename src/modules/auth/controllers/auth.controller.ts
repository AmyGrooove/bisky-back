import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpStatus,
  Patch,
  Put,
  Headers,
} from "@nestjs/common"
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiSecurity,
} from "@nestjs/swagger"
import { User } from "../../user/schemas/user.schema"
import { UserService } from "../../user/services/user.service"
import { AuthService } from "../services/auth.service"
import { CreateUserDto } from "../dto/createUser.dto"
import { LoginUserDto } from "../dto/loginUser.dto"
import { AccessTokenGuard } from "../guards/accessToken.guard"
import { RefreshTokenGuard } from "../guards/refreshToken.guard"
import { TokensModel } from "../entities/tokens.entity"

@ApiTags("Auth")
@Controller("auth")
class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: "Check access-token" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: User,
  })
  @ApiSecurity("AccessToken")
  @UseGuards(AccessTokenGuard)
  @Get("whoami")
  async whoami(@Request() req) {
    await this.userService.updateUser({
      _id: req.user._id,
      updateUserDto: { lastOnlineDate: new Date() },
    })

    return this.userService.findPublicUserData({ _id: req.user._id })
  }

  @ApiOperation({ summary: "Sign Up" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: TokensModel,
  })
  @Put("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @ApiOperation({ summary: "Sign In" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: TokensModel,
  })
  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @ApiOperation({ summary: "Renew Access Token" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: TokensModel,
  })
  @ApiHeader({
    name: "Authorization",
    required: false,
    description: "(Leave empty. Use lock icon on the top-right to authorize)",
  })
  @ApiSecurity("RefreshToken")
  @UseGuards(RefreshTokenGuard)
  @Patch("refresh")
  refreshTokens(
    @Headers("Authorization") authentication: string,
    @Request() req,
  ) {
    return this.authService.refreshTokens({
      userId: req.user._id,
      refreshToken: authentication.replace("Bearer ", ""),
    })
  }

  @ApiOperation({
    summary: "Log off the network (remove refreshToken from the database)",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiSecurity("AccessToken")
  @UseGuards(AccessTokenGuard)
  @Patch("logout")
  logout(@Request() req) {
    return this.authService.logout(req.user._id)
  }
}

export { AuthController }
