import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Filter values" })
class FilterStudioQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id?: string[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  name?: string[] | null
}

export { FilterStudioQuery }
