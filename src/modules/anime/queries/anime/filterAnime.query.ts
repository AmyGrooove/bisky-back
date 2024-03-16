import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import {
  DateBetweenQuery,
  EKind,
  ERating,
  EStatus,
  FloatBetweenQuery,
  IntBetweenQuery,
} from "../../../../auxiliary"

@InputType({ description: "Limit documents by these parameters" })
class FilterAnimeQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id_ID?: ObjectId[] | null

  @Field(() => [Number], { nullable: true, defaultValue: null })
  shikiId?: number[] | null

  @Field(() => [EKind], { nullable: true, defaultValue: null })
  kind?: EKind[] | null

  @Field(() => [EStatus], { nullable: true, defaultValue: null })
  status?: EStatus[] | null

  @Field(() => [ERating], { nullable: true, defaultValue: null })
  rating?: ERating[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  genres_ID?: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  studios_ID?: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  franchises_ID?: ObjectId[] | null

  @Field(() => FloatBetweenQuery, { nullable: true, defaultValue: null })
  score_averageScore?: FloatBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  dates_airedAt?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  dates_releasedOn?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  episodes_lastEpisodeAiredDate?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  episodes_nextEpisodeAiredDate?: DateBetweenQuery | null

  @Field(() => DateBetweenQuery, { nullable: true, defaultValue: null })
  episodes_averageDuration?: DateBetweenQuery | null

  @Field(() => IntBetweenQuery, { nullable: true, defaultValue: null })
  episodes_airedCount?: IntBetweenQuery | null
}

export { FilterAnimeQuery }
