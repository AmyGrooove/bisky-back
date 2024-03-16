import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { LanguageDocument, LanguageSchema } from "../../../../auxiliary"

@Schema({ collection: "RelatedAnime", _id: false, versionKey: false })
class RelatedAnime {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Anime",
  })
  base: ObjectId

  @Prop({ type: Number, required: true })
  shikiId: number

  @Prop({ type: LanguageSchema, default: {} })
  relation: LanguageDocument
}

type RelatedAnimeDocument = HydratedDocument<RelatedAnime>
const RelatedAnimeSchema = SchemaFactory.createForClass(RelatedAnime)

export { RelatedAnimeDocument, RelatedAnimeSchema }
