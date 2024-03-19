import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { CreateUserDto } from "./createUser.dto"

class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  image?: string

  refreshToken?: string

  lastOnlineDate?: Date
}

export { UpdateUserDto }
