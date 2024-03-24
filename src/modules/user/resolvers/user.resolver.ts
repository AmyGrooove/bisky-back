import { Args, Query, Resolver } from "@nestjs/graphql"
import { UserService } from "../services/user.service"
import { UserPublicFullModel } from "../entities/userPublicFull.entity"

@Resolver()
class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPublicFullModel, { name: "getUserPublicData" })
  async getUserPublicData(
    @Args("_id", { type: () => String, nullable: true, defaultValue: null })
    _id?: string,

    @Args("username", {
      type: () => String,
      nullable: true,
      defaultValue: null,
    })
    username?: string,
  ) {
    return this.userService.getUser({ _id, username })
  }
}

export { UserResolver }
