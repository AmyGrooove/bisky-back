import { Field, ObjectType } from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@ObjectType({ description: "This anime is on other platforms" })
class OtherPlatformSimpleModel {
  @Field(() => String, { description: "Link to this anime on this platform" })
  url: string

  @Field(() => String)
  platform: ObjectId
}

export { OtherPlatformSimpleModel }
