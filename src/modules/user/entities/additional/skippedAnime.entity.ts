import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
class SkippedAnimeModel {
  @Field(() => String)
  animeId: string

  @Field(() => Date)
  updateDate: Date
}

export { SkippedAnimeModel }
