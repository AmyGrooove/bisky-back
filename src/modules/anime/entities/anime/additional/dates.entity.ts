import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "Date information" })
class DatesModel {
  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
    description: "Anime release date",
  })
  airedAt: Date | null

  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
    description: "Anime release date",
  })
  releasedOn: Date | null
}

export { DatesModel }
