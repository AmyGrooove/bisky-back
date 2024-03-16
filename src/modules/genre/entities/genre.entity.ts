import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { LanguageModel } from "../../../auxiliary"

@ObjectType({ description: "Data on anime genres" })
class GenreModel {
  @Field(() => String)
  _id: ObjectId

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { GenreModel }
