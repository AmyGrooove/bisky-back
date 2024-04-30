import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { EHistory, EListStatus } from "../../../../auxiliary"

@Schema({ collection: "AnimeEstimateHistory", _id: false, versionKey: false })
class AnimeEstimateHistory {
  @Prop({ type: String, enum: EHistory, required: true })
  type: EHistory

  @Prop({ type: Number, default: null })
  count: number | null

  @Prop({ type: String, enum: EListStatus, default: null })
  animeType: EListStatus | null

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Anime" })
  animeId: ObjectId[]

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
    set: () => new Date(),
  })
  updateDate: Date
}

type AnimeEstimateHistoryDocument = HydratedDocument<AnimeEstimateHistory>
const AnimeEstimateHistorySchema =
  SchemaFactory.createForClass(AnimeEstimateHistory)

export { AnimeEstimateHistoryDocument, AnimeEstimateHistorySchema }
