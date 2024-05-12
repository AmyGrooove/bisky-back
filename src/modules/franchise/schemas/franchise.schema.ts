import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

import { LanguageDocument, LanguageSchema } from "../../../auxiliary"

@Schema({ collection: "Franchise", versionKey: false })
class Franchise {
  @Prop({ type: LanguageSchema, default: {} })
  name: LanguageDocument

  @Prop({ type: String, required: true, unique: true })
  shikiId: string

  @Prop({ type: LanguageSchema, default: {} })
  description: LanguageDocument

  @Prop({ type: String, default: null })
  logo: string | null
}

type FranchiseDocument = HydratedDocument<Franchise>
const FranchiseSchema = SchemaFactory.createForClass(Franchise)

export { Franchise, FranchiseSchema, type FranchiseDocument }
