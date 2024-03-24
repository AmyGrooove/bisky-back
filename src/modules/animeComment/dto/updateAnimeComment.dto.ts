import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, MinLength } from "class-validator"

class UpdateAnimeCommentDto {
  @ApiProperty({ minLength: 1, maxLength: 450 })
  @IsString()
  @MinLength(1)
  @MaxLength(450)
  text: string
}

export { UpdateAnimeCommentDto }
