import { Field, ObjectType } from "@nestjs/graphql"
import { GenreModel } from "./genre.entity"
import { AnimeSimpleModel } from "../../anime/entities/animeSimple.entity"

@ObjectType({ description: "Data on anime genres" })
class GenreFullModel extends GenreModel {
  @Field(() => [AnimeSimpleModel])
  relatedWorks: AnimeSimpleModel[]
}

export { GenreFullModel }
