import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

@Schema({ collection: "Genres", versionKey: false })
class Genres {
  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  name: { en: string | null; ru: string | null }

  @Prop()
  isHentai: boolean

  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  description: { en: string | null; ru: string | null }
}

type GenresDocument = HydratedDocument<Genres>
const GenresSchema = SchemaFactory.createForClass(Genres)

export { Genres, GenresSchema, type GenresDocument }
