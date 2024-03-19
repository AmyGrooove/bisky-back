import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

class LoginUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  username: string

  @ApiProperty()
  @IsString()
  @Length(6)
  password: string
}

export { LoginUserDto }
