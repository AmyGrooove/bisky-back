import { Field, ObjectType } from "@nestjs/graphql"
import { AnimeCommentModel } from "./animeComment.entity"
import { UserPublicModel } from "../../user/entities/userPublic.entity"

@ObjectType()
class AnimeCommentLikeModel {
  @Field(() => UserPublicModel)
  author: UserPublicModel

  @Field(() => AnimeCommentModel)
  base: AnimeCommentModel

  @Field(() => Date)
  createTime: Date

  @Field(() => Boolean)
  isLiked: boolean
}

export { AnimeCommentLikeModel }
