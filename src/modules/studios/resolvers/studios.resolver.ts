import { Resolver, Query, Args, Int } from "@nestjs/graphql"
import { StudiosService } from "../services/studios.service"
import { StudiosModel } from "../entities/studios.entity"
import { SpecificStudiosQuery } from "./queries"

@Resolver()
class StudiosResolver {
  constructor(private studiosService: StudiosService) {}

  @Query(() => [StudiosModel], { name: "getStudios" })
  async getStudios(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,

    @Args("count", {
      type: () => Int,
      defaultValue: 100,
      description: "Number of output items",
    })
    count: number,

    @Args("specificValues", {
      type: () => SpecificStudiosQuery,
      nullable: true,
      defaultValue: null,
      description: "Get specific values",
    })
    specificValues: SpecificStudiosQuery | null,
  ) {
    return this.studiosService.getStudios(page, count, specificValues)
  }
}

export { StudiosResolver }
