import { Field, InputType, Int } from "@nestjs/graphql"

import { FilterPlatformQuery } from "./filterPlatform.query"

@InputType({ description: "Platform arguments" })
class GeneralPlatformQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number

  @Field(() => FilterPlatformQuery, { nullable: true, defaultValue: null })
  filter?: FilterPlatformQuery | null
}

export { GeneralPlatformQuery }
