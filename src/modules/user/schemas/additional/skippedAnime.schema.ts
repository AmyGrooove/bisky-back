import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

@Schema({
  collection: "SkippedAnime",
  _id: false,
  versionKey: false,
  expireAfterSeconds: 15778800,
})
class SkippedAnime {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Anime" })
  animeId: ObjectId

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
    set: () => new Date(),
  })
  updateDate: Date
}

type SkippedAnimeDocument = HydratedDocument<SkippedAnime>
const SkippedAnimeSchema = SchemaFactory.createForClass(SkippedAnime)

export { SkippedAnimeDocument, SkippedAnimeSchema }
