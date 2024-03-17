import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty, ApiTags } from "@nestjs/swagger"
import { ObjectId } from "mongoose"

@ObjectType({ description: "Facts about anime/manga/Japan, etc." })
class FactModel {
  @Field(() => String)
  _id: ObjectId

  @ApiProperty()
  @Field(() => String, { nullable: true, defaultValue: null })
  en: string

  @ApiProperty()
  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string
}

export { FactModel }
