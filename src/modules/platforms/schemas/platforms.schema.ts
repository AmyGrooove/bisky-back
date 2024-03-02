import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

@Schema({ collection: "Platforms", versionKey: false })
class Platforms {
  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  name: { en: string | null; ru: string | null }

  @Prop([String])
  urls: string[]

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  logo: string | null

  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  description: { en: string | null; ru: string | null }
}

type PlatformsDocument = HydratedDocument<Platforms>
const PlatformsSchema = SchemaFactory.createForClass(Platforms)

export { Platforms, PlatformsSchema, type PlatformsDocument }
