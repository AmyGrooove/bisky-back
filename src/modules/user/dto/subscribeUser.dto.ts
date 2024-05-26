import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId } from "class-validator"

class SubscribeUserDto {
  @ApiProperty()
  @IsMongoId()
  subscribeUserId: string
}

export { SubscribeUserDto }
