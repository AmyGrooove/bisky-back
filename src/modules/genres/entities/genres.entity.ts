import { Field, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "src/entities"

@ObjectType({ description: "Data on anime genres" })
class GenresModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => Boolean, { defaultValue: false })
  isHentai: boolean

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { GenresModel }
