import { Field, ObjectType } from "@nestjs/graphql"
import { AnimeEstimateModel } from "./animeEstimate/animeEstimate.entity"
import { AnimeListModel } from "./animeList/animeList.entity"
import { UserPublicModel } from "./userPublic.entity"

@ObjectType()
class UserPublicFullModel extends UserPublicModel {
  @Field(() => [AnimeEstimateModel])
  animeEstimates: AnimeEstimateModel[]

  @Field(() => [AnimeListModel])
  animeLists: AnimeListModel[]
}

export { UserPublicFullModel }
