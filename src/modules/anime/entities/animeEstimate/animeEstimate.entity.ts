import { Field, Int, ObjectType } from "@nestjs/graphql"
import { UserPublicModel } from "../../../user/entities/userPublic.entity"
import { AnimeSimpleModel } from "../anime/animeSimple.entity"

@ObjectType()
class AnimeEstimateModel {
  @Field(() => Date)
  createTime: Date

  @Field(() => Int)
  score: number

  @Field(() => UserPublicModel)
  author: UserPublicModel

  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel
}

export { AnimeEstimateModel }
