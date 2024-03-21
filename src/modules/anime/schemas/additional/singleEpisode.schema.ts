import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "SingleEpisode", _id: false, versionKey: false })
class SingleEpisode {
  @Prop({ type: String, default: null })
  name: string | null

  @Prop({ type: Date, default: null })
  airedOn: Date | null

  @Prop({ type: Number, default: 0 })
  duration: number
}

type SingleEpisodeDocument = HydratedDocument<SingleEpisode>
const SingleEpisodeSchema = SchemaFactory.createForClass(SingleEpisode)

export { SingleEpisodeDocument, SingleEpisodeSchema }
