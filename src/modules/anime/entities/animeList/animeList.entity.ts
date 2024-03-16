import { Field, ObjectType } from "@nestjs/graphql"
import { EStatus } from "../../../../auxiliary"
import { UserPublicModel } from "../../../user/entities/userPublic.entity"
import { AnimeSimpleModel } from "../anime/animeSimple.entity"

@ObjectType()
class AnimeListModel {
  @Field(() => Date)
  createTime: Date

  @Field(() => EStatus)
  status: EStatus

  @Field(() => UserPublicModel)
  author: UserPublicModel

  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel
}

export { AnimeListModel }
