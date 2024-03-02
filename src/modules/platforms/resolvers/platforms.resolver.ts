import { Resolver, Query, Args, Int } from "@nestjs/graphql"
import { PlatformsService } from "../services/platforms.service"
import { PlatformsModel } from "../entities/platforms.entity"
import { SpecificPlatformsQuery } from "./queries"

@Resolver()
class PlatformsResolver {
  constructor(private platformService: PlatformsService) {}

  @Query(() => [PlatformsModel], { name: "getPlatforms" })
  async getPlatforms(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,

    @Args("count", {
      type: () => Int,
      defaultValue: 100,
      description: "Number of output items",
    })
    count: number,

    @Args("specificValues", {
      type: () => SpecificPlatformsQuery,
      nullable: true,
      defaultValue: null,
      description: "Get specific values",
    })
    specificValues: SpecificPlatformsQuery | null,
  ) {
    return this.platformService.getPlatforms(page, count, specificValues)
  }
}

export { PlatformsResolver }
