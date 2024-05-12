import { Field, Int, ObjectType } from "@nestjs/graphql"

import { EListStatus } from "../../../auxiliary"
import { AnimeSimpleModel } from "../../anime/entities/animeSimple.entity"

@ObjectType()
class AnimeEstimateModel {
  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel

  @Field(() => EListStatus)
  status: EListStatus

  @Field(() => Int, { nullable: true, defaultValue: null })
  score: number | null

  @Field(() => Int, { defaultValue: 0 })
  watchedSeries: number
}

export { AnimeEstimateModel }
