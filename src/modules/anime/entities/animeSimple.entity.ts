import { Field, ObjectType } from "@nestjs/graphql"
import { AnimeModel } from "./anime.entity"
import { RelatedAnimeSimpleModel } from "./additional/relatedAnimeSimple.entity"
import { OtherPlatformSimpleModel } from "./additional/otherPlatformSimple.entity"

@ObjectType({ description: "Anime Data" })
class AnimeSimpleModel extends AnimeModel {
  @Field(() => [RelatedAnimeSimpleModel])
  related: RelatedAnimeSimpleModel[]

  @Field(() => [String], { description: "Genres of this anime (_id)" })
  genres: string[]

  @Field(() => [String], {
    description: "The studios that developed this anime (_id)",
  })
  studios: string[]

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Related other projects with this anime (_id)",
  })
  franchise: string | null

  @Field(() => [OtherPlatformSimpleModel])
  otherPlatforms: OtherPlatformSimpleModel[]
}

export { AnimeSimpleModel }
