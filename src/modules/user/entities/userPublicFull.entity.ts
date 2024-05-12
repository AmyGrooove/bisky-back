import { Field, ObjectType } from "@nestjs/graphql"

import { UserPublicModel } from "./userPublic.entity"
import { AnimeEstimateModel } from "./animeEstimate.entity"

@ObjectType()
class UserPublicFullModel extends UserPublicModel {
  @Field(() => [AnimeEstimateModel])
  animeEstimates: AnimeEstimateModel[]
}

export { UserPublicFullModel }
