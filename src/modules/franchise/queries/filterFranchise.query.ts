import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Filter values" })
class FilterFranchiseQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id?: string[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  name_en?: string[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  name_ru?: string[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  shikiId?: string[]
}

export { FilterFranchiseQuery }
