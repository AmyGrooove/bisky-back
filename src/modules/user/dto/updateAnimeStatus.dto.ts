import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, ValidateIf } from "class-validator"
import { EListStatus } from "../../../auxiliary"

class UpdateAnimeStatusDto {
  @ApiProperty({ enum: EListStatus, nullable: true })
  @IsEnum(EListStatus)
  @ValidateIf((_, value) => value !== null)
  status: EListStatus | null
}

export { UpdateAnimeStatusDto }
