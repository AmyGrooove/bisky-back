import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
class LanguageModel {
  @Field(() => String, { nullable: true, defaultValue: null })
  en: string | null

  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string | null
}

export { LanguageModel }
