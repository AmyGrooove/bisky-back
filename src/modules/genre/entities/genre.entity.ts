import { Field, ObjectType } from "@nestjs/graphql"

import { LanguageModel } from "../../../auxiliary"

@ObjectType({ description: "Data on anime genres" })
class GenreModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { GenreModel }
