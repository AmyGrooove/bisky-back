import { Module } from "@nestjs/common"

import { ImageService } from "./services/image.service"

@Module({
  providers: [ImageService],
  exports: [ImageService],
})
class UploadModule {}

export { UploadModule }
