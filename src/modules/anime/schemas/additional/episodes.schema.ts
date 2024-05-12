import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "Episodes", _id: false, versionKey: false })
class Episodes {
  @Prop({ type: Number, default: null })
  count: number | null

  @Prop({ type: Number, default: null })
  airedCount: number | null

  @Prop({ type: Date, default: null })
  nextEpisodeAiredDate: Date | null

  @Prop({ type: Date, default: null })
  lastEpisodeAiredDate: Date | null

  @Prop({ type: Number, default: null })
  duration: number | null
}

type EpisodesDocument = HydratedDocument<Episodes>
const EpisodesSchema = SchemaFactory.createForClass(Episodes)

export { EpisodesDocument, EpisodesSchema }
