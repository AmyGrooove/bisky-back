import { Resolver, Query, Args, Int } from "@nestjs/graphql"

import { GenresModel } from "../entities/genres.entity"
import { AdditionalInfoService } from "../services/additional-info.service"

@Resolver()
export class AdditionalInfoResolver {
  constructor(private additionalInfoService: AdditionalInfoService) {}

  @Query(() => [GenresModel], { name: "getAllGenres" })
  async getAllGenres(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,
    @Args("count", { type: () => Int, defaultValue: 10 }) count: number,
    @Args("hentai", { type: () => Boolean, defaultValue: false })
    hentai: boolean,
  ) {
    return this.additionalInfoService.getGenres(page, count, hentai)
  }

  @Query(() => String, { name: "getRandomFact" })
  async getRandomFact() {
    return this.additionalInfoService.getRandomFact()
  }
}
