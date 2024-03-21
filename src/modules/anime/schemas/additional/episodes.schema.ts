import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import {
  SingleEpisodeDocument,
  SingleEpisodeSchema,
} from "./singleEpisode.schema"

@Schema({ collection: "Episodes", _id: false, versionKey: false })
class Episodes {
  @Prop({ type: Number, default: null })
  count: number | null

  @Prop({ type: [SingleEpisodeSchema], default: [] })
  singleEpisodes: SingleEpisodeDocument[]
}

type EpisodesDocument = HydratedDocument<Episodes>
const EpisodesSchema = SchemaFactory.createForClass(Episodes)

export { EpisodesDocument, EpisodesSchema }
