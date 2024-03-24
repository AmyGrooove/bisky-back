import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, MinLength } from "class-validator"

class LoginUserDto {
  @ApiProperty({ minLength: 3, maxLength: 30 })
  @IsString()
  @Length(3, 30)
  username: string

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string
}

export { LoginUserDto }
