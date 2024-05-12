import { Field, ObjectType } from "@nestjs/graphql"

import { PlatformModel } from "../../../platform/entities/platform.entity"

@ObjectType({ description: "This anime is on other platforms" })
class OtherPlatformFullModel {
  @Field(() => String, { description: "Link to this anime on this platform" })
  url: string

  @Field(() => PlatformModel)
  platform: PlatformModel
}

export { OtherPlatformFullModel }
