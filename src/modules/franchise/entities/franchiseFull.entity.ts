import { Field, ObjectType } from "@nestjs/graphql"
import { FranchiseModel } from "./franchise.entity"
import { AnimeSimpleModel } from "../../anime/entities/anime/animeSimple.entity"

@ObjectType({ description: "Related projects" })
class FranchiseFullModel extends FranchiseModel {
  @Field(() => [AnimeSimpleModel])
  relatedWorks: AnimeSimpleModel[]
}

export { FranchiseFullModel }
