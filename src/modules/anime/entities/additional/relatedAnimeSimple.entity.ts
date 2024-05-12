import { Field, Int, ObjectType } from "@nestjs/graphql"

import { LanguageModel } from "../../../../auxiliary"

@ObjectType({ description: "Related anime projects" })
class RelatedAnimeSimpleModel {
  @Field(() => String, { description: "Anime _id" })
  base: string

  @Field(() => Int)
  shikiId: number

  @Field(() => LanguageModel, {
    description: "Names of the bundle of this anime project",
  })
  relation: LanguageModel
}

export { RelatedAnimeSimpleModel }
