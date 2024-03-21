import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { EStatus } from "../../../auxiliary"

@Schema({ collection: "AnimeEstimate", versionKey: false })
class AnimeEstimate {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
  author: ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Anime" })
  base: ObjectId

  @Prop({ type: Date, required: true, set: () => new Date() })
  createTime: Date

  @Prop({ type: String, enum: EStatus, required: true })
  status: EStatus

  @Prop({ type: Number, default: null })
  score: number | null

  @Prop({ type: Number, default: 0 })
  watchedSeries: number
}

type AnimeEstimateDocument = HydratedDocument<AnimeEstimate>
const AnimeEstimateSchema = SchemaFactory.createForClass(AnimeEstimate)

export { AnimeEstimate, AnimeEstimateDocument, AnimeEstimateSchema }
