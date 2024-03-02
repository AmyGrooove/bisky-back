import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { LanguageQuery } from "../../../../queries"

@InputType({ description: "Get specific values" })
class SpecificStudiosQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id: ObjectId[] | null

  @Field(() => [LanguageQuery], { nullable: true, defaultValue: null })
  name: LanguageQuery[] | null
}

export { SpecificStudiosQuery }
