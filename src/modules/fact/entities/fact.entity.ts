import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@ObjectType({ description: "Facts about anime/manga/Japan, etc." })
class FactModel {
  @Field(() => String)
  _id: string

  @ApiProperty()
  @Field(() => String, { nullable: true, defaultValue: null })
  en: string

  @ApiProperty()
  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string
}

export { FactModel }
