import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@InputType({ description: "Filter values" })
class FilterStudioQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id?: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  name?: string[] | null
}

export { FilterStudioQuery }
