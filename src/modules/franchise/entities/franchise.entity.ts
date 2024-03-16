import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { LanguageModel } from "../../../auxiliary"

@ObjectType({ description: "Related projects" })
class FranchiseModel {
  @Field(() => String)
  _id: ObjectId

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => String)
  shikiId: string

  @Field(() => LanguageModel)
  description: LanguageModel
}

export { FranchiseModel }
