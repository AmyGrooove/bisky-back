import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

import { LanguageDocument, LanguageSchema } from "../../../auxiliary"

@Schema({ collection: "Genre", versionKey: false })
class Genre {
  @Prop({ type: LanguageSchema, default: {} })
  name: LanguageDocument

  @Prop({ type: LanguageSchema, default: {} })
  description: LanguageDocument
}

type GenreDocument = HydratedDocument<Genre>
const GenreSchema = SchemaFactory.createForClass(Genre)

export { Genre, GenreSchema, type GenreDocument }
