import { extname } from "path"

import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"

const ImageUpload = () =>
  applyDecorators(
    UseInterceptors(
      FileInterceptor("file", {
        storage: diskStorage({
          destination: "./uploads",
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname)
            callback(null, `${uniqueSuffix}${ext}`)
          },
        }),
        fileFilter: (req, file, callback) => {
          const fileExt = extname(file.originalname).toLowerCase()

          if (![".png", ".jpg", ".webp", ".jpeg"].includes(fileExt))
            return callback(
              new BadRequestException("Invalid file extension"),
              false,
            )

          callback(null, true)
        },
        limits: { fileSize: 10 * 1024 * 1024 },
      }),
    ),
  )

export { ImageUpload }
