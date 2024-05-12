import { Field, ObjectType } from "@nestjs/graphql"

import { LanguageModel } from "../../../auxiliary"

@ObjectType({ description: "Related projects" })
class FranchiseModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => String)
  shikiId: string

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { FranchiseModel }
