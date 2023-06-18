import { Resolver, Query, Args, Int, ID } from "@nestjs/graphql"

import { AnimeInfoModel } from "./entities/anime-info.entity"
import { AnimeInfoService } from "./anime-Info.service"

@Resolver(() => AnimeInfoModel)
export class AnimeInfoResolver {
  constructor(private animeInfoService: AnimeInfoService) {}

  @Query((returns) => AnimeInfoModel, { name: "getAnime" })
  async getAnimeInfo(@Args("shiki_id", { type: () => ID }) shiki_id: number) {
    return this.animeInfoService.getOneItem(shiki_id)
  }
}
