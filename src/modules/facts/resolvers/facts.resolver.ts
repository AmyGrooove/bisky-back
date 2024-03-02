import { Resolver, Query, Args, Int } from "@nestjs/graphql"
import { LanguageModel } from "../../../entities"
import { FactsService } from "../services/facts.service"
import { SpecificFactsQuery } from "./queries"

@Resolver()
class FactsResolver {
  constructor(private factsService: FactsService) {}

  @Query(() => [LanguageModel], { name: "getFacts" })
  async getFacts(
    @Args("count", {
      type: () => Int,
      defaultValue: 100,
      description: "Number of output items",
    })
    count: number,

    @Args("specificValues", {
      type: () => SpecificFactsQuery,
      nullable: true,
      defaultValue: null,
      description: "Get specific values",
    })
    specificValues: SpecificFactsQuery | null,
  ) {
    return this.factsService.getFacts(count, specificValues)
  }
}

export { FactsResolver }
