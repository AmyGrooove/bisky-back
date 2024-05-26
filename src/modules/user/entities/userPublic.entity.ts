import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

import { ERole } from "../../../auxiliary"
import { UserListModel } from "../../anime/entities/additional/userList.entity"

@ObjectType()
class UserPublicModel {
  @ApiProperty({ type: String })
  @Field(() => String)
  _id: string

  @ApiProperty()
  @Field(() => String)
  username: string

  @ApiProperty()
  @Field(() => String)
  email: string

  @ApiProperty()
  @Field(() => String, { nullable: true, defaultValue: null })
  avatar: string | null

  @ApiProperty()
  @Field(() => ERole)
  role: ERole

  @ApiProperty()
  @Field(() => Date)
  lastOnlineDate: Date

  @Field(() => UserListModel)
  animeList: UserListModel
}

export { UserPublicModel }
