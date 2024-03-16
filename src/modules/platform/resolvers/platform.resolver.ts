import { Args, Query, Resolver } from "@nestjs/graphql"
import { PlatformService } from "../services/platform.service"
import { PlatformModel } from "../entities/platform.entity"
import { GeneralPlatformQuery } from "../queries/generalPlatform.query"

@Resolver()
class PlatformResolver {
  constructor(private platformService: PlatformService) {}

  @Query(() => [PlatformModel], { name: "getPlatforms" })
  async getPlatforms(
    @Args("PlatformQuery", {
      type: () => GeneralPlatformQuery,
      defaultValue: { page: 1, count: 10 },
    })
    platformQuery: GeneralPlatformQuery,
  ) {
    return this.platformService.getPlatforms(platformQuery)
  }
}

export { PlatformResolver }
