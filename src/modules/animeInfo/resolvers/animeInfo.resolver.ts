import { Resolver, Query, Args, Int } from "@nestjs/graphql"
import { AnimeInfoService } from "../services/animeInfo.service"
import { AnimeInfoModel } from "../entities/animeInfo.entity"
import {
  LimitQuantityAnimeInfoQuery,
  FilterAnimeInfoQuery,
  SortAnimeInfoQuery,
} from "./queries"

@Resolver()
class AnimeInfoResolver {
  constructor(private animeInfoService: AnimeInfoService) {}

  @Query(() => [AnimeInfoModel], { name: "geAnimesInfo" })
  async geAnimesInfo(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,

    @Args("count", {
      type: () => Int,
      defaultValue: 10,
      description: "Number of output items",
    })
    count: number,

    @Args("limitQuantityQuery", {
      type: () => LimitQuantityAnimeInfoQuery,
      nullable: true,
      defaultValue: null,
    })
    limitQuantityQuery: LimitQuantityAnimeInfoQuery | null,

    @Args("filterQuery", {
      type: () => FilterAnimeInfoQuery,
      nullable: true,
      defaultValue: null,
    })
    filterQuery: FilterAnimeInfoQuery | null,

    @Args("sortQuery", {
      type: () => SortAnimeInfoQuery,
      nullable: true,
      defaultValue: null,
    })
    sortQuery: SortAnimeInfoQuery | null,
  ) {
    return this.animeInfoService.getAnimesInfo(
      page,
      count,
      limitQuantityQuery,
      filterQuery,
      sortQuery,
    )
  }

  @Query(() => AnimeInfoModel, {
    name: "getOneAnimeInfo",
    description: "Find a specific anime",
  })
  async getOneAnimeInfo(
    @Args("value", {
      type: () => String,
      description: "Accepts: _id, shikiId, labels",
    })
    value: string,

    @Args("limitQuantityQuery", {
      type: () => LimitQuantityAnimeInfoQuery,
      nullable: true,
      defaultValue: null,
    })
    limitQuantityQuery: LimitQuantityAnimeInfoQuery | null,
  ) {
    return this.animeInfoService.getOneAnimeInfo(value, limitQuantityQuery)
  }
}

export { AnimeInfoResolver }
