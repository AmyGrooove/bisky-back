import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "Project video sources (trailers, teasers, etc.)" })
class VideModel {
  @Field(() => String, { nullable: true, defaultValue: null })
  name: string | null

  @Field(() => String)
  url: string
}

export { VideModel }
