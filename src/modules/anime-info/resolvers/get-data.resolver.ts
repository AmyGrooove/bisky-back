import { Resolver, Query, Args, Int } from "@nestjs/graphql"

import { AnimeInfoModel } from "../entities/anime-info.entity"
import { AnimeInfoService } from "../services/get-data.service"

@Resolver(() => AnimeInfoModel)
export class AnimeInfoResolver {
  constructor(private animeInfoService: AnimeInfoService) {}

  @Query(() => AnimeInfoModel, { name: "getOneAnime" })
  async getAnimeInfo(@Args("id", { type: () => Int }) id: number) {
    return this.animeInfoService.getOneAnime(id)
  }
}
