import { Module } from "@nestjs/common"
import { MulterModule } from "@nestjs/platform-express"
import { memoryStorage } from "multer"

import { ImageService } from "./services/image.service"

@Module({
  imports: [MulterModule.register({ storage: memoryStorage() })],
  providers: [ImageService],
  exports: [ImageService],
})
class UploadModule {}

export { UploadModule }
