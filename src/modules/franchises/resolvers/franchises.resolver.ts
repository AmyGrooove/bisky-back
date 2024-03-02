import { Resolver, Query, Args, Int } from "@nestjs/graphql"
import { FranchisesService } from "../services/franchises.service"
import { FranchisesModel } from "../entities/franchises.entity"
import { SpecificFranchisesQuery } from "./queries"

@Resolver()
class FranchisesResolver {
  constructor(private franchisesService: FranchisesService) {}

  @Query(() => [FranchisesModel], { name: "getFranchises" })
  async getFranchises(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,

    @Args("count", {
      type: () => Int,
      defaultValue: 20,
      description: "Number of output items",
    })
    count: number,

    @Args("specificValues", {
      type: () => SpecificFranchisesQuery,
      nullable: true,
      defaultValue: null,
      description: "Get specific values",
    })
    specificValues: SpecificFranchisesQuery | null,
  ) {
    return this.franchisesService.getFranchises(page, count, specificValues)
  }
}

export { FranchisesResolver }
