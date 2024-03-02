import { Field, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "../../../entities"

@ObjectType({
  description:
    "Platforms on which you can view additional information about a particular anime",
})
class PlatformsModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => [String], { description: "Links to this platform" })
  urls: string[]

  @Field(() => String, { nullable: true, defaultValue: null })
  logo: string | null

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { PlatformsModel }
