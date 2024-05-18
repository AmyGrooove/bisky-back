import { ApiProperty } from "@nestjs/swagger"

class FileUploadDto {
  @ApiProperty({ type: "string", format: "binary", required: true })
  file: Express.Multer.File
}

export { FileUploadDto }
