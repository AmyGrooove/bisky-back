import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

@Schema({ collection: "Studios", versionKey: false })
class Studios {
  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  name: { en: string | null; ru: string | null }

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

type StudiosDocument = HydratedDocument<Studios>
const StudiosSchema = SchemaFactory.createForClass(Studios)

export { Studios, StudiosSchema, type StudiosDocument }
