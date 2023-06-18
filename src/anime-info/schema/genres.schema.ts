import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type GenresDocument = HydratedDocument<Genres>

@Schema({ collection: "Genres", versionKey: false })
export class Genres {
  @Prop({ required: true, unique: true, ref: "AnimeInfo" })
  id: number

  @Prop({ type: { en: String, ru: String } })
  name: {
    en: string
    ru: string
  }

  @Prop({ type: mongoose.Schema.Types.Mixed })
  type: "anime" | "manga" | null
}

export const GenresSchema = SchemaFactory.createForClass(Genres)
