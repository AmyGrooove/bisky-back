import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@ObjectType()
class LanguageModel {
  @ApiProperty({ nullable: true })
  @Field(() => String, { nullable: true, defaultValue: null })
  en: string | null

  @ApiProperty({ nullable: true })
  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string | null
}

export { LanguageModel }
