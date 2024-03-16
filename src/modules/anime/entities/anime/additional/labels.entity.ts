import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "Names in different languages" })
class LabelsModel {
  @Field(() => String, { nullable: true, defaultValue: null })
  en: string | null

  @Field(() => String, { nullable: true, defaultValue: null })
  ru: string | null

  @Field(() => [String], {
    defaultValue: [],
    description: "Titles in other languages or synonymous with the original",
  })
  synonyms: string[]
}

export { LabelsModel }
