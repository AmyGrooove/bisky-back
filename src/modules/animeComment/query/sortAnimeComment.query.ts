import { Field, InputType } from "@nestjs/graphql"

@InputType({
  description: "Sorting documents (false - ascending; true - descending)",
})
class SortAnimeCommentQuery {
  @Field(() => Boolean, { nullable: true, defaultValue: null })
  createTime?: boolean | null

  @Field(() => Boolean, { nullable: true, defaultValue: null })
  likesCount?: boolean | null
}

export { SortAnimeCommentQuery }
