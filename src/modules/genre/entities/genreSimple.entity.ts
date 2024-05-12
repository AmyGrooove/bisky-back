import { Field, ObjectType } from "@nestjs/graphql"

import { GenreModel } from "./genre.entity"

@ObjectType({ description: "Data on anime genres" })
class GenreSimpleModel extends GenreModel {
  @Field(() => [String], { defaultValue: [], description: "Anime _ids" })
  relatedWorks: string[]
}

export { GenreSimpleModel }
