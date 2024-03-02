import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

@Schema({ collection: "Franchises", versionKey: false })
class Franchises {
  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  name: { en: string | null; ru: string | null }

  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  description: { en: string | null; ru: string | null }

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  logo: string | null
}

type FranchisesDocument = HydratedDocument<Franchises>
const FranchisesSchema = SchemaFactory.createForClass(Franchises)

export { Franchises, FranchisesSchema, type FranchisesDocument }
