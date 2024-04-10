import { Field, InputType } from "@nestjs/graphql"

@InputType()
class FilterUserQuery {
  @Field(() => String, { nullable: true, defaultValue: null })
  _id_ID?: string | null

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
  })
  username?: string | null
}

export { FilterUserQuery }
