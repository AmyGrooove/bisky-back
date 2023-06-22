import { PartialType } from "@nestjs/swagger"
import { CreateUserDto } from "./create-user.dto"

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string
  image?: string
  refreshToken?: string
}
