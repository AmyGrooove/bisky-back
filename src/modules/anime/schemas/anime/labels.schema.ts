import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "Labels", _id: false, versionKey: false })
class Labels {
  @Prop({ type: String, default: null })
  en: string | null

  @Prop({ type: String, default: null })
  ru: string | null

  @Prop({ type: [String], default: [] })
  synonyms: string[]
}

type LabelsDocument = HydratedDocument<Labels>
const LabelsSchema = SchemaFactory.createForClass(Labels)

export { LabelsDocument, LabelsSchema }
