import { Field, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "../../../auxiliary"

@ObjectType({
  description:
    "Platforms on which you can view additional information about a particular anime",
})
class PlatformModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => String)
  shikiId: string

  @Field(() => String, { nullable: true, defaultValue: null })
  logo: string | null
}

export { PlatformModel }
