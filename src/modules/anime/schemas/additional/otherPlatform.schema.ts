import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

@Schema({ collection: "OtherPlatform", _id: false, versionKey: false })
class OtherPlatform {
  @Prop({ type: String, required: true })
  url: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Platform",
  })
  platform: ObjectId
}

type OtherPlatformDocument = HydratedDocument<OtherPlatform>
const OtherPlatformSchema = SchemaFactory.createForClass(OtherPlatform)

export { OtherPlatformDocument, OtherPlatformSchema }
