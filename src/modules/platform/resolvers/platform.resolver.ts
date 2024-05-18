import { Args, Query, Resolver } from "@nestjs/graphql"
import { UseInterceptors } from "@nestjs/common"

import { PlatformService } from "../services/platform.service"
import { PlatformModel } from "../entities/platform.entity"
import { GeneralPlatformQuery } from "../queries/generalPlatform.query"
import { CacheResolver } from "../../../decorators"

@Resolver()
class PlatformResolver {
  constructor(private platformService: PlatformService) {}

  @UseInterceptors(CacheResolver)
  @Query(() => [PlatformModel], { name: "getPlatforms" })
  async getPlatforms(
    @Args("platformQuery", {
      type: () => GeneralPlatformQuery,
      defaultValue: { page: 1, count: 10 },
    })
    platformQuery: GeneralPlatformQuery,
  ) {
    return this.platformService.getPlatforms(platformQuery)
  }
}

export { PlatformResolver }
