import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "UserPersonalization", _id: false, versionKey: false })
class UserPersonalization {
  @Prop({ type: String, default: null })
  badge: string | null

  @Prop({ type: String, default: null })
  background: string | null
}

type UserPersonalizationDocument = HydratedDocument<UserPersonalization>
const UserPersonalizationSchema =
  SchemaFactory.createForClass(UserPersonalization)

export { UserPersonalizationDocument, UserPersonalizationSchema }
