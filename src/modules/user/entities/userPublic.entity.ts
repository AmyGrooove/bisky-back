import { Field, ObjectType } from "@nestjs/graphql"
import { ERole } from "../../../auxiliary"
import { ApiProperty } from "@nestjs/swagger"

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
}

export { UserPublicModel }
