import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "Fact", versionKey: false })
class Fact {
  @Prop({ type: String, default: null })
  en: string | null

  @Prop({ type: String, default: null })
  ru: string | null
}

type FactDocument = HydratedDocument<Fact>
const FactSchema = SchemaFactory.createForClass(Fact)

export { Fact, FactSchema, type FactDocument }
