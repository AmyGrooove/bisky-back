import { Field, ObjectType } from "@nestjs/graphql"
import { GenreModel } from "./genre.entity"
import { ObjectId } from "mongoose"

@ObjectType({ description: "Data on anime genres" })
class GenreSimpleModel extends GenreModel {
  @Field(() => [String])
  relatedWorks: ObjectId[]
}

export { GenreSimpleModel }
