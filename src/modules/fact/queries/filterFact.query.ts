import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Filter values" })
class FilterFactQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id: string[] | null
}

export { FilterFactQuery }
