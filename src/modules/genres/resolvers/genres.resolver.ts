import { Resolver, Query, Args, Int } from "@nestjs/graphql"
import { GenresService } from "../services/genres.service"
import { GenresModel } from "../entities/genres.entity"
import { SpecificGenresQuery } from "./queries"

@Resolver()
class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query(() => [GenresModel], { name: "getGenres" })
  async getGenres(
    @Args("count", {
      type: () => Int,
      defaultValue: 100,
      description: "Number of output items",
    })
    count: number,

    @Args("specificValues", {
      type: () => SpecificGenresQuery,
      nullable: true,
      defaultValue: null,
      description: "Get specific values",
    })
    specificValues: SpecificGenresQuery | null,
  ) {
    return this.genresService.getGenres(count, specificValues)
  }
}

export { GenresResolver }
