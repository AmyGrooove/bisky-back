import { ApiProperty } from "@nestjs/swagger"
import { IsEnum } from "class-validator"

import { EListStatus } from "../../../auxiliary"

class UpdateAnimeStatusDto {
  @ApiProperty({ enum: EListStatus, nullable: true })
  @IsEnum(EListStatus)
  status: EListStatus
}

export { UpdateAnimeStatusDto }
