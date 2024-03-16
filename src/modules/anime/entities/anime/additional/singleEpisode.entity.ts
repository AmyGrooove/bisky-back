import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "Information about each series separately" })
class SingleEpisodeModel {
  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Episode title",
  })
  name: string | null

  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
    description: "Episode release date",
  })
  airedAt: Date | null

  @Field(() => Int, { defaultValue: 0, description: "Episode duration" })
  duration: number
}

export { SingleEpisodeModel }
