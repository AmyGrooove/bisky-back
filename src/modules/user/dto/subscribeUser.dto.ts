import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsString } from "class-validator"

class SubscribeUserDto {
  @ApiProperty()
  @IsString()
  @IsMongoId()
  subscribeUserId: string
}

export { SubscribeUserDto }
