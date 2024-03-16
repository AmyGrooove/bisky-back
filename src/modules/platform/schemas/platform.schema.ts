import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { LanguageDocument, LanguageSchema } from "../../../auxiliary"

@Schema({ collection: "Platform", versionKey: false })
class Platform {
  @Prop({ type: LanguageSchema, default: {} })
  name: LanguageDocument

  @Prop({ type: String, required: true, unique: true })
  shikiId: string

  @Prop({ type: String, default: null })
  logo: string | null
}

type PlatformDocument = HydratedDocument<Platform>
const PlatformSchema = SchemaFactory.createForClass(Platform)

export { Platform, PlatformSchema, type PlatformDocument }
