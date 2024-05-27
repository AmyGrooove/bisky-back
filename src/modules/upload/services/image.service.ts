import { extname } from "path"

import { Injectable, BadRequestException } from "@nestjs/common"
import { Client } from "minio"
import sharp from "sharp"

@Injectable()
class ImageService {
  private readonly minioClient: Client

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    })
  }

  async uploadFile(buffer: Buffer, fileName: string) {
    await this.minioClient.putObject(process.env.MINIO_BUCKET, fileName, buffer)
  }

  async processImage(
    file: Express.Multer.File,
    options: {
      fileName: string
      minioPath: string
      width?: number
      height?: number
      isOriginalSize?: boolean
    },
  ) {
    const validExtensions = [".png", ".jpg", ".webp", ".jpeg"]
    const fileExt = extname(file.originalname).toLowerCase()

    if (!validExtensions.includes(fileExt))
      new BadRequestException("Invalid file extension")

    if (file.size > 10 * 1024 * 1024)
      new BadRequestException("File size exceeds limit of 10MB")

    const newDateTimeStamp = new Date().getTime()

    let buffer = file.buffer

    if (!options.isOriginalSize)
      buffer = await sharp(file.buffer)
        .resize(options.width, options.height, { fit: "inside" })
        .toFormat("jpg")
        .toBuffer()

    await this.uploadFile(
      buffer,
      `${options.minioPath}_${String(newDateTimeStamp)}.jpg`,
    )

    return `https://${process.env.MINIO_ENDPOINT}/${
      process.env.MINIO_BUCKET
    }/${`${options.minioPath}_${String(
      newDateTimeStamp,
    )}.jpg`}?response-content-type=image/jpg`
  }
}

export { ImageService }
