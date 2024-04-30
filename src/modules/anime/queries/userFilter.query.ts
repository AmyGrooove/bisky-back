import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "User anime display settings" })
class UserFilterQuery {
  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
    description:
      "Remove from the results all anime that are added to the skip list",
  })
  isHiddenAnimeInSkipList?: boolean

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
    description: "Delete all anime that are in the user's list",
  })
  isHiddenAnimeInUserList?: boolean
}

export { UserFilterQuery }
