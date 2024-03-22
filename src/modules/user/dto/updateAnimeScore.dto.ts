import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Max, Min, ValidateIf } from "class-validator"

class UpdateAnimeScoreDto {
  @ApiProperty({ minimum: 1, maximum: 10, nullable: true })
  @IsNumber()
  @Max(10)
  @Min(1)
  @ValidateIf((_, value) => value !== null)
  score: number | null
}

export { UpdateAnimeScoreDto }
