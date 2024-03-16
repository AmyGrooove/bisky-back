import { Field, InputType, Int } from "@nestjs/graphql"

@InputType({ description: "Limitations on the number of a particular field" })
class LimitQuantityAnimeQuery {
  @Field(() => Int, { defaultValue: 100, description: "Number of related" })
  relatedCount?: number | null

  @Field(() => Int, { defaultValue: 100, description: "Number of screenshots" })
  screenshotsCount?: number | null

  @Field(() => Int, { defaultValue: 100, description: "Number of video" })
  videosCount?: number | null
}

export { LimitQuantityAnimeQuery }
