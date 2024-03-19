import { Field, ObjectType } from "@nestjs/graphql"
import { EStatus } from "../../../../auxiliary"
import { AnimeSimpleModel } from "../../../anime/entities/animeSimple.entity"

@ObjectType()
class AnimeListModel {
  @Field(() => Date)
  createTime: Date

  @Field(() => EStatus)
  status: EStatus

  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel
}

export { AnimeListModel }
