import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type GenresDocument = HydratedDocument<Genres>

@Schema({ collection: "Genres", versionKey: false })
export class Genres {
  @Prop({
    type: {
      anime: mongoose.Schema.Types.Mixed,
      manga: Number,
    },
    anime: { ref: "AnimeInfo" },
  })
  link_id: {
    anime: number | null
    manga: number
  }

  @Prop({ type: { en: String, ru: String } })
  name: {
    en: string
    ru: string
  }

  @Prop({ type: Boolean })
  hentai: boolean
}

export const GenresSchema = SchemaFactory.createForClass(Genres)
