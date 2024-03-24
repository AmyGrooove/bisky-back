import { Field, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "../../../auxiliary"

@ObjectType({
  description: "The studios that are developing this or that anime",
})
class StudioModel {
  @Field(() => String)
  _id: string

  @Field(() => String)
  name: string

  @Field(() => LanguageModel)
  description: LanguageModel

  @Field(() => String, { nullable: true, defaultValue: null })
  logo: string | null
}

export { StudioModel }
