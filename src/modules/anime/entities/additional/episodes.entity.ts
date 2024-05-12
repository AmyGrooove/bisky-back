import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "General information about anime series" })
class EpisodesModel {
  @Field(() => Int, {
    nullable: true,
    defaultValue: null,
    description:
      "Number of episodes/Episodes planned (if null, then the number of series is unlimited)",
  })
  count: number | null

  @Field(() => Int, { nullable: true, defaultValue: null })
  airedCount: number | null

  @Field(() => Date, { nullable: true, defaultValue: null })
  nextEpisodeAiredDate: Date | null

  @Field(() => Date, { nullable: true, defaultValue: null })
  lastEpisodeAiredDate: Date | null

  @Field(() => Int, { nullable: true, defaultValue: null })
  duration: number
}

export { EpisodesModel }
