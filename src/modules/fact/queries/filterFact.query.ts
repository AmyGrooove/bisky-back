import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@InputType({ description: "Filter values" })
class FilterFactQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id: ObjectId[] | null
}

export { FilterFactQuery }
