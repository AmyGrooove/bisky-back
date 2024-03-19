import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@InputType({ description: "Filter values" })
class FilterGenreQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id?: ObjectId[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  name_en?: string[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  name_ru?: string[] | null
}

export { FilterGenreQuery }