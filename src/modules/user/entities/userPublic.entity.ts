import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
class UserPublicModel {
  @Field(() => String)
  username: string

  @Field(() => String, { nullable: true, defaultValue: null })
  avatar: string | null
}

export { UserPublicModel }
