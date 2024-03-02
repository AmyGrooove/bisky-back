import { Field, InputType } from "@nestjs/graphql"

@InputType()
class LanguageQuery {
  @Field(() => String, { nullable: true, defaultValue: null })
  en: string | null

  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string | null
}

export { LanguageQuery }
