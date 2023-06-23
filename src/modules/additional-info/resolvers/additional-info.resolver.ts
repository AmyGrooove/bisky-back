import { Resolver, Query } from "@nestjs/graphql"

import { GenresModel } from "../entities/genres.entity"
import { AdditionalInfoService } from "../services/additional-info.service"

@Resolver()
export class AdditionalInfoResolver {
  constructor(private additionalInfoService: AdditionalInfoService) {}

  @Query(() => [GenresModel], { name: "getAllGenres" })
  async getAllGenres() {
    return this.additionalInfoService.getGenres()
  }

  @Query(() => String, { name: "getRandomFact" })
  async getRandomFact() {
    return this.additionalInfoService.getRandomFact()
  }
}
