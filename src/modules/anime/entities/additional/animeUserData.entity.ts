import { Field, Int, ObjectType } from "@nestjs/graphql"
import { EListStatus } from "../../../../auxiliary"

@ObjectType()
class AnimeUserDataModel {
  @Field(() => EListStatus, { nullable: true, defaultValue: null })
  animeStatus: EListStatus

  @Field(() => Int, { nullable: true, defaultValue: null })
  score: number

  @Field(() => Int, { nullable: true, defaultValue: null })
  watchedSeries: number
}

export { AnimeUserDataModel }
