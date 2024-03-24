import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, ValidateIf } from "class-validator"

class UpdateAnimeCommentLikeDto {
  @ApiProperty({
    nullable: true,
    description: "If null, then the like is deleted",
  })
  @IsBoolean()
  @ValidateIf((_, value) => value !== null)
  like: boolean | null
}

export { UpdateAnimeCommentLikeDto }
