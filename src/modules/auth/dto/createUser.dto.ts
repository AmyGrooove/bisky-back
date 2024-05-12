import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

import { LoginUserDto } from "./loginUser.dto"

class CreateUserDto extends LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string
}

export { CreateUserDto }
