import { Field, InputType, Int } from "@nestjs/graphql"

import { FilterFranchiseQuery } from "./filterFranchise.query"

@InputType({ description: "Franchise arguments" })
class GeneralFranchiseQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number

  @Field(() => FilterFranchiseQuery, { nullable: true, defaultValue: null })
  filter?: FilterFranchiseQuery | null
}

export { GeneralFranchiseQuery }
