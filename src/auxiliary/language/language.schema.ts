import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "Language", _id: false, versionKey: false })
class Language {
  @Prop({ type: String, default: null })
  en: string | null

  @Prop({ type: String, default: null })
  ru: string | null
}

type LanguageDocument = HydratedDocument<Language>
const LanguageSchema = SchemaFactory.createForClass(Language)

export { LanguageSchema, type LanguageDocument }
