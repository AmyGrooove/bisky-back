import { Field, ObjectType } from "@nestjs/graphql"

import { AnimeSimpleModel } from "../../anime/entities/animeSimple.entity"

import { FranchiseModel } from "./franchise.entity"

@ObjectType({ description: "Related projects" })
class FranchiseFullModel extends FranchiseModel {
  @Field(() => [AnimeSimpleModel])
  relatedWorks: AnimeSimpleModel[]
}

export { FranchiseFullModel }
