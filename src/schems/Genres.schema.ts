import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type GenresDocument = HydratedDocument<Genres>

@Schema({ collection: "Genres" })
export class Genres {
  @Prop({ required: true, unique: true }) genre_id: number

  @Prop({ type: { en: String, ru: String } }) name: {
    en: string
    ru: string
  }

  @Prop() type: string
}

export const GenresSchema = SchemaFactory.createForClass(Genres)
