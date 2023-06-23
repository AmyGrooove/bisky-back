import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class Language {
  @Field()
  en: string

  @Field()
  ru: string
}
