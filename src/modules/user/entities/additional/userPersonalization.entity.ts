import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
class UserPersonalizationModel {
  @Field(() => String, { nullable: true, defaultValue: null })
  badge: string | null

  @Field(() => String, { nullable: true, defaultValue: null })
  background: string | null
}

export { UserPersonalizationModel }
