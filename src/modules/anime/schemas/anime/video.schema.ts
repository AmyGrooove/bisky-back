import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "Video", _id: false, versionKey: false })
class Video {
  @Prop({ type: String, default: null })
  name: string | null

  @Prop({ type: String, required: true })
  url: string
}

type VideoDocument = HydratedDocument<Video>
const VideoSchema = SchemaFactory.createForClass(Video)

export { VideoDocument, VideoSchema }
