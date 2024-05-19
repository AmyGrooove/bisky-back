import { extname } from "path"

import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from "multer"

const ImageUpload = () =>
  applyDecorators(
    UseInterceptors(
      FileInterceptor("file", {
        storage: memoryStorage(),
        fileFilter: (req, file, callback) => {
          const fileExt = extname(file.originalname).toLowerCase()

          if (![".png", ".jpg", ".webp", ".jpeg"].includes(fileExt)) {
            return callback(
              new BadRequestException("Invalid file extension"),
              false,
            )
          }

          callback(null, true)
        },
        limits: { fileSize: 10 * 1024 * 1024 },
      }),
    ),
  )

export { ImageUpload }
