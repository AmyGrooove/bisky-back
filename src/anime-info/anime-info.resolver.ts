import { Resolver, Query, Args, Int, ID } from "@nestjs/graphql"

import { AnimeInfoModel } from "./entities/anime-info.entity"
import { AnimeInfoService } from "./anime-Info.service"

@Resolver(() => AnimeInfoModel)
export class AnimeInfoResolver {
  constructor(private animeInfoService: AnimeInfoService) {}

  @Query((returns) => AnimeInfoModel, { name: "getOneAnime" })
  async getAnimeInfo(@Args("id", { type: () => ID }) id: number) {
    return this.animeInfoService.getOneAnime(id)
  }
}
