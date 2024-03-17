import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}

export { CreateUserDto }
