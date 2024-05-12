import { Field, Int, ObjectType } from "@nestjs/graphql"

import { LanguageModel } from "../../../../auxiliary"
import { AnimeSimpleModel } from "../animeSimple.entity"

@ObjectType({ description: "Related anime projects" })
class RelatedAnimeFullModel {
  @Field(() => AnimeSimpleModel)
  base: AnimeSimpleModel

  @Field(() => Int)
  shikiId: number

  @Field(() => LanguageModel, {
    description: "Names of the bundle of this anime project",
  })
  relation: LanguageModel
}

export { RelatedAnimeFullModel }
