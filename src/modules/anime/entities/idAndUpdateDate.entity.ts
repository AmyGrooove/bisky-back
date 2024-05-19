import { ObjectType, Field } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@ObjectType()
class IdAndUpdateDateModel {
  @ApiProperty({ type: String })
  @Field(() => String)
  _id: string

  @ApiProperty({ type: Date })
  @Field(() => Date)
  updateDate: Date
}

export { IdAndUpdateDateModel }
