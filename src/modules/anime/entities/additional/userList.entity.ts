import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
class UserListModel {
  @Field(() => Int, { defaultValue: 0 })
  generalCount: number

  @Field(() => Int, { defaultValue: 0 })
  addedCount: number

  @Field(() => Int, { defaultValue: 0 })
  watchingCount: number

  @Field(() => Int, { defaultValue: 0 })
  completedCount: number

  @Field(() => Int, { defaultValue: 0 })
  droppedCount: number
}

export { UserListModel }
