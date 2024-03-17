import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

class LoginUserDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
}

export { LoginUserDto }
