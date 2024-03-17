import { ApiProperty, PartialType } from "@nestjs/swagger"
import { CreateUserDto } from "./create-user.dto"
import { IsString } from "class-validator"

class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  image?: string

  @ApiProperty()
  @IsString()
  refreshToken?: string
}

export { UpdateUserDto }
