import { Field, InputType, Int } from "@nestjs/graphql"

import { FilterStudioQuery } from "./filterStudio.query"

@InputType({ description: "Studio arguments" })
class GeneralStudioQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number

  @Field(() => FilterStudioQuery, { nullable: true, defaultValue: null })
  filter?: FilterStudioQuery | null
}

export { GeneralStudioQuery }
