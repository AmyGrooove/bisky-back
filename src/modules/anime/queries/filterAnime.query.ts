import { Field, InputType } from "@nestjs/graphql"

import {
  DateBetweenQuery,
  EKind,
  ERating,
  EStatus,
  FloatBetweenQuery,
  IntBetweenQuery,
} from "../../../auxiliary"

@InputType({ description: "Limit documents by these parameters" })
class FilterAnimeQuery {
  @Field(() => [String], {
    nullable: true,
    defaultValue: null,
    description: "Anime _ids",
  })
  _id_ID?: string[] | null

  @Field(() => [Number], { nullable: true, defaultValue: null })
  shikiId?: number[] | null

  @Field(() => [EKind], { nullable: true, defaultValue: null })
  kind?: EKind[] | null

  @Field(() => [EStatus], { nullable: true, defaultValue: null })
  status?: EStatus[] | null

  @Field(() => [ERating], { nullable: true, defaultValue: null })
  rating?: ERating[] | null

  @Field(() => [String], {
    nullable: true,
    defaultValue: null,
    description: "Genre _ids",
  })
  genres_ID_ONLY?: string[] | null

  @Field(() => [String], {
    nullable: true,
    defaultValue: null,
    description: "Studio _ids",
  })
  studios_ID_ONLY?: string[] | null

  @Field(() => [String], {
    nullable: true,
    defaultValue: null,
    description: "Franchise _ids",
  })
  franchise_ID_ONLY?: string[] | null

  @Field(() => FloatBetweenQuery, { nullable: true, defaultValue: null })
  score_averageScore?: FloatBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  dates_airedOn?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  dates_releasedOn?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  episodes_lastEpisodeAiredDate?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  episodes_nextEpisodeAiredDate?: DateBetweenQuery | null

  @Field(() => IntBetweenQuery, { nullable: true, defaultValue: null })
  episodes_duration?: IntBetweenQuery | null

  @Field(() => IntBetweenQuery, { nullable: true, defaultValue: null })
  episodes_count?: IntBetweenQuery | null

  @Field(() => IntBetweenQuery, { nullable: true, defaultValue: null })
  episodes_airedCount?: IntBetweenQuery | null
}

export { FilterAnimeQuery }
