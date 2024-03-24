import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@ObjectType()
class TokensModel {
  @ApiProperty({ type: String })
  @Field(() => String)
  accessToken: string

  @ApiProperty({ type: String })
  @Field(() => String)
  refreshToken: string
}

export { TokensModel }
