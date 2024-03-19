import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { ERole } from "../../../auxiliary"
import { AnimeEstimateModel } from "./animeEstimate/animeEstimate.entity"
import { AnimeListModel } from "./animeList/animeList.entity"

@ObjectType()
class UserPublicModel {
  @Field(() => String)
  _id: ObjectId

  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String, { nullable: true, defaultValue: null })
  avatar: string | null

  @Field(() => ERole)
  role: ERole

  @Field(() => Date)
  lastOnlineDate: Date

  @Field(() => [AnimeEstimateModel])
  animeEstimates: AnimeEstimateModel[]

  @Field(() => [AnimeListModel])
  animeLists: AnimeListModel[]

  // @Field(() => [AnimeListModel])
  // animeComments: AnimeListModel[]
}

export { UserPublicModel }
