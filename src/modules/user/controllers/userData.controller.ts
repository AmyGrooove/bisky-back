import {
  Controller,
  HttpStatus,
  Patch,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
} from "@nestjs/common"
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { ClearCache, ImageUpload } from "../../../decorators"
import { ImageService } from "../../upload/services/image.service"
import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { FileUploadDto } from "../dto/fileUpload.dto"
import { UserService } from "../services/user.service"
import { SubscribeUserDto } from "../dto/subscribeUser.dto"

@ApiTags("UserData")
@UseInterceptors(CacheInterceptor)
@Controller("user")
class UserDataController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

  @ApiOperation({ summary: "Subscribe to user" })
  @ApiSecurity("AccessToken")
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCache)
  @Patch("/subscribeToUser")
  async subscribeToUser(
    @Request() req,
    @Body() subscribeUserId: SubscribeUserDto,
  ) {
    return this.userService.subscribeToUser({
      userId: req.user._id,
      subscribeUserId: subscribeUserId.subscribeUserId,
    })
  }

  @ApiOperation({ summary: "UnSubscribe from user" })
  @ApiSecurity("AccessToken")
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCache)
  @Delete("/subscribeToUser")
  async unSubscribeFromUser(
    @Request() req,
    @Body() subscribeUserId: SubscribeUserDto,
  ) {
    return this.userService.unSubscribeFromUser({
      userId: req.user._id,
      subscribeUserId: subscribeUserId.subscribeUserId,
    })
  }

  @ApiOperation({ summary: "Update user avatar" })
  @ApiSecurity("AccessToken")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean })
  @UseGuards(AccessTokenGuard)
  @ImageUpload()
  @UseInterceptors(ClearCache)
  @Patch("/avatar")
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const fileUrl = await this.imageService.processImage(file, {
      fileName: `${req.user.username}_avatar`,
      minioPath: `avatars/${req.user.username}_avatar.jpg`,
      width: 400,
      height: 400,
    })

    await this.userService.updateUser({
      _id: req.user._id,
      updateUserDto: { avatar: fileUrl },
    })

    return true
  }

  @ApiOperation({ summary: "Update user background" })
  @ApiSecurity("AccessToken")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean })
  @UseGuards(AccessTokenGuard)
  @ImageUpload()
  @UseInterceptors(ClearCache)
  @Patch("/background")
  async updateBackground(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const fileUrl = await this.imageService.processImage(file, {
      fileName: `${req.user.username}_background`,
      minioPath: `backgrounds/${req.user.username}_background.jpg`,
    })

    await this.userService.updateUser({
      _id: req.user._id,
      updateUserDto: { userPersonalization: { background: fileUrl } },
    })

    return true
  }
}

export { UserDataController }
