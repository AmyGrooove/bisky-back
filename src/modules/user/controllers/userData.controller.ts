import {
  Controller,
  HttpStatus,
  Patch,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
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

@ApiTags("UserData")
@UseInterceptors(CacheInterceptor)
@Controller("user")
class UserDataController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

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
}

export { UserDataController }
