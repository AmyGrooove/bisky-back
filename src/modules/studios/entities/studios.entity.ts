import { Field, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "src/entities"

@ObjectType({
  description: "The studios that are developing this or that anime",
})
class StudiosModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => String, { nullable: true, defaultValue: null })
  logo: string | null

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { StudiosModel }
