import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { AnimeModel } from "./anime.entity"
import { RelatedAnimeSimpleModel } from "./additional/relatedAnimeSimple.entity"
import { OtherPlatformSimpleModel } from "./additional/otherPlatformSimple.entity"

@ObjectType({ description: "Anime Data" })
class AnimeSimpleModel extends AnimeModel {
  @Field(() => [RelatedAnimeSimpleModel])
  related: RelatedAnimeSimpleModel[]

  @Field(() => [String], { description: "Genres of this anime (ID)" })
  genres: ObjectId[]

  @Field(() => [String], {
    description: "The studios that developed this anime (ID)",
  })
  studios: ObjectId[]

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Related other projects with this anime (ID)",
  })
  franchise: ObjectId | null

  @Field(() => [OtherPlatformSimpleModel])
  otherPlatforms: OtherPlatformSimpleModel[]
}

export { AnimeSimpleModel }
