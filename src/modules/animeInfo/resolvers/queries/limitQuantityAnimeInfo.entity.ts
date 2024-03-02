import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Limitations on the number of a particular field" })
class LimitQuantityAnimeInfoQuery {
  @Field(() => Number, {
    nullable: true,
    defaultValue: null,
    description: "Number of screenshots",
  })
  screenshotsCount: number | null
}

export { LimitQuantityAnimeInfoQuery }
