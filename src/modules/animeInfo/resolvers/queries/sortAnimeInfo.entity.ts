import { Field, InputType } from "@nestjs/graphql"

@InputType({
  description:
    "Sort by one field or another; False - Ascending, True - Descending",
})
class SortAnimeInfoQuery {
  @Field(() => Boolean, {
    nullable: true,
    defaultValue: null,
    description: "By date of last update",
  })
  updateDate: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  generalScore: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  allEpisodesScore: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  platformScore: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  releasedOn: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  airedOn: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodesCount: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodesAiredCount: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodesAverageDuration: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  lastEpisodeOn: boolean | null
}

export { SortAnimeInfoQuery }
