import { Resolver, Query, Args, Int } from "@nestjs/graphql"

import { AnimeInfoModel } from "../entities/anime-info.entity"
import { AnimeInfoService } from "../services/anime-Info.module.service"
import { FilterArgs, SortArgs } from "../types/resolvers"

@Resolver(() => AnimeInfoModel)
export class AnimeInfoResolver {
  constructor(private animeInfoService: AnimeInfoService) {}

  @Query(() => AnimeInfoModel, { name: "getOneAnime" })
  async getOneAnime(@Args("id", { type: () => Int }) id: number) {
    return this.animeInfoService.getOneAnime(id)
  }

  @Query(() => [AnimeInfoModel], { name: "getAnimePages" })
  async getAnimePages(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,
    @Args("filter", { type: () => FilterArgs, nullable: true })
    filter?: FilterArgs,
    @Args("sort", { type: () => SortArgs, nullable: true })
    sort?: SortArgs,
  ) {
    return this.animeInfoService.getAnimePages(page, filter, sort)
  }
}
