import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

@Schema({ collection: "Facts", versionKey: false })
class Facts {
  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  en: string | null

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  ru: string | null
}

type FactsDocument = HydratedDocument<Facts>
const FactsSchema = SchemaFactory.createForClass(Facts)

export { Facts, FactsSchema, type FactsDocument }
