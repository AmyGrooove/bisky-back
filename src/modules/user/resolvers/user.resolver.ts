import { Args, Query, Resolver } from "@nestjs/graphql"
import { UserService } from "../services/user.service"
import { UserPublicModel } from "../entities/userPublic.entity"
import { ObjectId } from "mongoose"

@Resolver()
class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPublicModel, { name: "getUserPublicData" })
  async getUserPublicData(
    @Args("_id", { type: () => String, nullable: true, defaultValue: null })
    _id?: ObjectId,

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
