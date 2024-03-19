import { Field, Float, ObjectType } from "@nestjs/graphql"
import { AnimeSimpleModel } from "../../../anime/entities/animeSimple.entity"

@ObjectType()
class AnimeEstimateModel {
  @Field(() => Date)
  createTime: Date

  @Field(() => Float)
  score: number

  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel
}

export { AnimeEstimateModel }
