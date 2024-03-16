import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { StudioModel } from "./studio.entity"

@ObjectType({
  description: "The studios that are developing this or that anime",
})
class StudioSimpleModel extends StudioModel {
  @Field(() => [String])
  relatedWorks: ObjectId[]
}

export { StudioSimpleModel }
