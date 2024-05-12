import { Resolver, Query, Args, Int } from "@nestjs/graphql"

import { FactService } from "../services/fact.service"
import { FilterFactQuery } from "../queries/filterFact.query"
import { FactModel } from "../entities/fact.entity"

@Resolver()
class FactResolver {
  constructor(private factService: FactService) {}

  @Query(() => [FactModel], { name: "getFacts" })
  async getFacts(
    @Args("page", {
      type: () => Int,
      defaultValue: 1,
      description: "Page when paginated",
    })
    page: number,

    @Args("count", {
      type: () => Int,
      defaultValue: 10,
      description: "Number of output items",
    })
    count: number,

    @Args("filter", {
      type: () => FilterFactQuery,
      nullable: true,
      defaultValue: null,
    })
    filter: FilterFactQuery | null,
  ) {
    return this.factService.getFacts(page, count, filter)
  }
}

export { FactResolver }
