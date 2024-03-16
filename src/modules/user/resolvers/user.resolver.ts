import { Resolver } from "@nestjs/graphql"
import { UserService } from "../services/user.service"

@Resolver()
class UserResolver {
  constructor(private userService: UserService) {}
}

export { UserResolver }
