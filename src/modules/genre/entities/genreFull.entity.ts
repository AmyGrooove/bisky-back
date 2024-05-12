import { Field, ObjectType } from "@nestjs/graphql"

import { AnimeSimpleModel } from "../../anime/entities/animeSimple.entity"

import { GenreModel } from "./genre.entity"

@ObjectType({ description: "Data on anime genres" })
class GenreFullModel extends GenreModel {
  @Field(() => [AnimeSimpleModel])
  relatedWorks: AnimeSimpleModel[]
}

export { GenreFullModel }
