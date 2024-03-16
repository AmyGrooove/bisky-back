import { Field, ObjectType } from "@nestjs/graphql"
import { AnimeCommentLikeModel } from "./animeCommentLike.entity"
import { AnimeSimpleModel } from "../../anime/entities/anime/animeSimple.entity"
import { UserPublicModel } from "../../user/entities/userPublic.entity"

@ObjectType()
class AnimeCommentModel {
  @Field(() => UserPublicModel)
  author: UserPublicModel

  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel

  @Field(() => Date)
  createTime: Date

  @Field(() => Date)
  updateTime: Date

  @Field(() => String)
  text: string

  @Field(() => [String])
  violations: string[]

  @Field(() => AnimeCommentModel)
  parent: AnimeCommentModel

  @Field(() => [AnimeCommentModel])
  childrens: AnimeCommentModel[]

  @Field(() => [AnimeCommentLikeModel])
  likes: AnimeCommentLikeModel[]
}

export { AnimeCommentModel }
