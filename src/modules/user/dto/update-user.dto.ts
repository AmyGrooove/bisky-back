import { PartialType } from "@nestjs/swagger"
import { CreateUserDto } from "./create-user.dto"

class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string
  image?: string
  refreshToken?: string
}

export { UpdateUserDto }
