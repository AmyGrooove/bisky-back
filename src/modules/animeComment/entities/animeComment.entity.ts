import { Field, Int, ObjectType } from "@nestjs/graphql"

import { UserPublicModel } from "../../user/entities/userPublic.entity"

@ObjectType()
class AnimeCommentModel {
  @Field(() => UserPublicModel)
  author: UserPublicModel

  @Field(() => Date)
  createTime: Date

  @Field(() => Date)
  updateTime: Date

  @Field(() => String)
  text: string

  @Field(() => [String])
  violations: string[]

  @Field(() => Int, { defaultValue: 0 })
  likesCount: number
}

export { AnimeCommentModel }
