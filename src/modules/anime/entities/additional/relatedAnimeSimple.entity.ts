import { Field, Int, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "../../../../auxiliary"
import { ObjectId } from "mongoose"

@ObjectType({ description: "Related anime projects" })
class RelatedAnimeSimpleModel {
  @Field(() => String)
  base: ObjectId

  @Field(() => Int)
  shikiId: number

  @Field(() => LanguageModel, {
    description: "Names of the bundle of this anime project",
  })
  relation: LanguageModel
}

export { RelatedAnimeSimpleModel }
