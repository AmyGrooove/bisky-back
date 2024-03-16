import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { FranchiseModel } from "./franchise.entity"

@ObjectType({ description: "Related projects" })
class FranchiseSimpleModel extends FranchiseModel {
  @Field(() => [String])
  relatedWorks: ObjectId[]
}

export { FranchiseSimpleModel }
