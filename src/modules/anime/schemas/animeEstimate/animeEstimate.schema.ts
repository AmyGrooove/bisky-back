import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

@Schema({ collection: "AnimeEstimate", versionKey: false })
class AnimeEstimate {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
  author: ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Anime" })
  base: ObjectId

  @Prop({ type: Date, required: true, set: () => new Date() })
  createTime: Date

  @Prop({ type: Number, required: true })
  score: number
}

type AnimeEstimateDocument = HydratedDocument<AnimeEstimate>
const AnimeEstimateSchema = SchemaFactory.createForClass(AnimeEstimate)

export { AnimeEstimate, AnimeEstimateDocument, AnimeEstimateSchema }
