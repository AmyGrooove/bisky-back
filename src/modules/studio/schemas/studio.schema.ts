import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { LanguageDocument, LanguageSchema } from "../../../auxiliary"

@Schema({ collection: "Studio", versionKey: false })
class Studio {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: LanguageSchema, default: {} })
  description: LanguageDocument

  @Prop({ type: String, default: null })
  logo: string | null
}

type StudioDocument = HydratedDocument<Studio>
const StudioSchema = SchemaFactory.createForClass(Studio)

export { Studio, StudioSchema, type StudioDocument }
