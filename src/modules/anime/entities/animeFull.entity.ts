import { Field, ObjectType } from "@nestjs/graphql"

import { FranchiseSimpleModel } from "../../franchise/entities/franchiseSimple.entity"
import { GenreSimpleModel } from "../../genre/entities/genreSimple.entity"
import { StudioSimpleModel } from "../../studio/entities/studioSimple.entity"

import { RelatedAnimeFullModel } from "./additional/relatedAnimeFull.entity"
import { AnimeModel } from "./anime.entity"
import { OtherPlatformFullModel } from "./additional/otherPlatformFull.entity"

@ObjectType({ description: "Anime Full Data" })
class AnimeFullModel extends AnimeModel {
  @Field(() => [RelatedAnimeFullModel])
  related: RelatedAnimeFullModel[]

  @Field(() => [GenreSimpleModel], { description: "Genres of this anime" })
  genres: GenreSimpleModel[]

  @Field(() => [StudioSimpleModel], {
    description: "The studios that developed this anime",
  })
  studios: StudioSimpleModel[]

  @Field(() => FranchiseSimpleModel, {
    nullable: true,
    defaultValue: null,
    description: "Related other projects with this anime",
  })
  franchise: FranchiseSimpleModel | null

  @Field(() => [OtherPlatformFullModel])
  otherPlatforms: OtherPlatformFullModel[]
}

export { AnimeFullModel }
