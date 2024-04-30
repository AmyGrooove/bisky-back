import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId } from "class-validator"

class SkipListDto {
  @ApiProperty()
  @IsMongoId()
  animeId: string
}

export { SkipListDto }
