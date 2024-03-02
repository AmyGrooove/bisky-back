import { Field, ObjectType } from "@nestjs/graphql"
import { LanguageModel } from "src/entities"
import { AnimeInfoModel } from "src/modules/animeInfo/entities/animeInfo.entity"

@ObjectType({ description: "Related projects" })
class FranchisesModel {
  @Field(() => String)
  _id: string

  @Field(() => LanguageModel)
  name: LanguageModel

  @Field(() => LanguageModel)
  description: LanguageModel

  @Field(() => String, { nullable: true, defaultValue: null })
  logo: string | null
}

export { FranchisesModel }
