import * as fs from "fs"
import { extname } from "path"
import { promisify } from "util"

import { Injectable, BadRequestException } from "@nestjs/common"
import sharp from "sharp"
import { Client } from "minio"

const rmAsync = promisify(fs.rm)

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

  async uploadFile(filePath: string, fileName: string) {
    const fileStream = fs.createReadStream(filePath)
    const fileStat = fs.statSync(filePath)

    await this.minioClient.putObject(
      process.env.MINIO_BUCKET,
      fileName,
      fileStream,
      fileStat.size,
    )

    fileStream.close()
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

    let processedImagePath = file.path
    if (!options.isOriginalSize) {
      processedImagePath = `./uploads/${options.fileName}.jpg`

      await sharp(file.path)
        .resize(options.width, options.height, { fit: "inside" })
        .toFormat("jpg")
        .toFile(processedImagePath)
    }

    await this.uploadFile(processedImagePath, options.minioPath)

    try {
      await rmAsync("uploads", { force: true, recursive: true })
    } catch (error) {
      /* empty */
    }

    return `https:/${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET}/${options.minioPath}?response-content-type=image/jpg`
  }
}

export { ImageService }
