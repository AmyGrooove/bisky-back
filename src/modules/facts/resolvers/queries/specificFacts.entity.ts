import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@InputType({ description: "Get specific values" })
class SpecificFactsQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id: ObjectId[] | null
}

export { SpecificFactsQuery }
