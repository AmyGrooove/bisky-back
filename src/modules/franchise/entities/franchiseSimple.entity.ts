import { Field, ObjectType } from "@nestjs/graphql"

import { FranchiseModel } from "./franchise.entity"

@ObjectType({ description: "Related projects" })
class FranchiseSimpleModel extends FranchiseModel {
  @Field(() => [String], { defaultValue: [], description: "Anime _ids" })
  relatedWorks: string[]
}

export { FranchiseSimpleModel }
