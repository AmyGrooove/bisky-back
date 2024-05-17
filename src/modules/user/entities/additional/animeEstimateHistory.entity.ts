import { Field, Int, ObjectType } from "@nestjs/graphql"

import { EHistory, EListStatus } from "../../../../auxiliary"
import { AnimeSimpleModel } from "../../../anime/entities/animeSimple.entity"

@ObjectType()
class AnimeEstimateHistoryModel {
  @Field(() => EHistory)
  type: EHistory

  @Field(() => Int, { nullable: true, defaultValue: null })
  count: number | null

  @Field(() => EListStatus, { nullable: true, defaultValue: null })
  animeType: EListStatus | null

  @Field(() => AnimeSimpleModel)
  animeId: AnimeSimpleModel

  @Field(() => Date)
  updateDate: Date
}

export { AnimeEstimateHistoryModel }
