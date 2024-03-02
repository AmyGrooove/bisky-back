import { Field, InputType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { LanguageQuery } from "src/queries"

@InputType({ description: "Get specific values" })
class SpecificPlatformsQuery {
  @Field(() => [String], { nullable: true, defaultValue: null })
  _id: ObjectId[] | null

  @Field(() => [LanguageQuery], { nullable: true, defaultValue: null })
  name: LanguageQuery[] | null

  @Field(() => [String], { nullable: true, defaultValue: null })
  urls: string[] | null
}

export { SpecificPlatformsQuery }
