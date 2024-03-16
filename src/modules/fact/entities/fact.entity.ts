import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@ObjectType({ description: "Facts about anime/manga/Japan, etc." })
class FactModel {
  @Field(() => String)
  _id: ObjectId

  @Field(() => String, { nullable: true, defaultValue: null })
  en: string

  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string
}

export { FactModel }
