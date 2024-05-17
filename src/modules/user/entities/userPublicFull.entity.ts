import { Field, ObjectType } from "@nestjs/graphql"

import { UserPublicModel } from "./userPublic.entity"
import { AnimeEstimateModel } from "./animeEstimate.entity"
import { FavoriteModel } from "./additional/favorite.entity"
import { UserPersonalizationModel } from "./additional/userPersonalization.entity"
import { SkippedAnimeModel } from "./additional/skippedAnime.entity"

@ObjectType()
class UserPublicFullModel extends UserPublicModel {
  @Field(() => [AnimeEstimateModel])
  animeEstimates: AnimeEstimateModel[]

  @Field(() => [SkippedAnimeModel])
  skippedAnime: SkippedAnimeModel[]

  @Field(() => [UserPublicModel])
  subscriptions: UserPublicModel[]

  @Field(() => UserPersonalizationModel)
  userPersonalization: UserPersonalizationModel

  @Field(() => FavoriteModel)
  favorites: FavoriteModel
}

export { UserPublicFullModel }
