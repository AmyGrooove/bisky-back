import { Field, InputType } from "@nestjs/graphql"

@InputType({
  description: "Sorting documents (false - ascending; true - descending)",
})
class SortAnimeQuery {
  @Field(() => Boolean, { nullable: true, defaultValue: null })
  score_averageScore?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  dates_airedAt?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  dates_releasedOn?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodes_airedCount?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodes_lastEpisodeAiredDate?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodes_nextEpisodeAiredDate?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  episodes_averageDuration?: boolean | null
}

export { SortAnimeQuery }
