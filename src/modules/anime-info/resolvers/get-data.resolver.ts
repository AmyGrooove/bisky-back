import { Resolver, Query, Args, Int } from "@nestjs/graphql"

import { AnimeInfoModel } from "../entities/anime-info.entity"
import { AnimeInfoService } from "../services/get-data.service"
import { GenresModel } from "../entities/genres.entity"
import { sortType } from "../enums/resolvers"

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
    @Args("sort", { type: () => sortType, defaultValue: sortType.best })
    sort: "ongoing" | "best" | "last",
  ) {
    return this.animeInfoService.getAnimePages(page, sort)
  }

  @Query(() => [GenresModel], { name: "getAllGenres" })
  async getAllGenres() {
    return this.animeInfoService.getGenres()
  }
}
