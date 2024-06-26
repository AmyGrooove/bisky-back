import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"

import { User } from "../../user/schemas/user.schema"

@ObjectType()
class UserWithTokensModel extends User {
  @ApiProperty({ type: String })
  @Field(() => String)
  declare _id: Types.ObjectId

  @ApiProperty({ type: String })
  @Field(() => String)
  accessToken: string

  @ApiProperty({ type: String })
  @Field(() => String)
  declare refreshToken: string
}

export { UserWithTokensModel }
