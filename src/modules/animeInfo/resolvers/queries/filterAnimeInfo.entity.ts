import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import {
  FromToDateQuery,
  FromToFloatQuery,
  FromToIntQuery,
} from "../../../../queries"
import { KindEnum, StatusEnum, RatingEnum } from "../../entities/enums"

@InputType({ description: "Filter by a particular field" })
class FilterAnimeInfoQuery {
  @Field(() => FromToDateQuery, {
    nullable: true,
    defaultValue: null,
    description: "By date of last update",
  })
  updateDate: FromToDateQuery | null

  @Field(() => FromToDateQuery, {
    nullable: true,
    defaultValue: null,
    description: "By release date",
  })
  releasedOn: FromToDateQuery | null

  @Field(() => FromToDateQuery, {
    nullable: true,
    defaultValue: null,
    description: "By release date of the first episode",
  })
  airedOn: FromToDateQuery | null

  @Field(() => FromToDateQuery, {
    nullable: true,
    defaultValue: null,
    description: "By release date of the last episode released",
  })
  lastEpisodeOn: FromToDateQuery | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  studiosId: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  platformsId: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  genresId: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  franchisesId: ObjectId[] | null

  @Field(() => [KindEnum], { nullable: true, defaultValue: null })
  kind: KindEnum[] | null

  @Field(() => [StatusEnum], { nullable: true, defaultValue: null })
  status: StatusEnum[] | null

  @Field(() => [RatingEnum], { nullable: true, defaultValue: null })
  rating: RatingEnum[] | null

  @Field(() => FromToFloatQuery, { nullable: true, defaultValue: null })
  generalScore: FromToFloatQuery | null

  @Field(() => FromToFloatQuery, { nullable: true, defaultValue: null })
  allEpisodesScores: FromToFloatQuery | null

  @Field(() => FromToFloatQuery, { nullable: true, defaultValue: null })
  platformScores: FromToFloatQuery | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  isUnlimitedSeries: boolean | null

  @Field(() => FromToIntQuery, { nullable: true, defaultValue: null })
  episodesCount: FromToIntQuery | null

  @Field(() => FromToIntQuery, { nullable: true, defaultValue: null })
  episodesAiredCount: FromToIntQuery | null

  @Field(() => FromToIntQuery, { nullable: true, defaultValue: null })
  episodesAverageDuration: FromToIntQuery | null
}

export { FilterAnimeInfoQuery }
