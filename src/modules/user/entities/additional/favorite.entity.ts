import { Field, ObjectType } from "@nestjs/graphql"
import { AnimeSimpleModel } from "src/modules/anime/entities/animeSimple.entity"

@ObjectType()
class FavoriteModel {
  @Field(() => [AnimeSimpleModel])
  animeIds: AnimeSimpleModel[]
}

export { FavoriteModel }
