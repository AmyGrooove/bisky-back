import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "This anime is on other platforms" })
class OtherPlatformSimpleModel {
  @Field(() => String, { description: "Link to this anime on this platform" })
  url: string

  @Field(() => String, { description: "Platform _id" })
  platform: string
}

export { OtherPlatformSimpleModel }
