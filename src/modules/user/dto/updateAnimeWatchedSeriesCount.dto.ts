import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Min } from "class-validator"

class UpdateAnimeWatchedSeriesDto {
  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  watchedSeriesCount: number
}

export { UpdateAnimeWatchedSeriesDto }
