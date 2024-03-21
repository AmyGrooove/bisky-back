import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

@Schema({ collection: "AnimeComment", versionKey: false })
class AnimeComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
  author: ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Anime" })
  base: ObjectId

  @Prop({ type: Date, required: true, set: (el: Date) => el ?? new Date() })
  createTime: Date

  @Prop({ type: Date, required: true, set: () => new Date() })
  updateTime: Date

  @Prop({ type: String, required: true })
  text: string

  @Prop({ type: [String], default: [] })
  violations: string[]
}

type AnimeCommentDocument = HydratedDocument<AnimeComment>
const AnimeCommentSchema = SchemaFactory.createForClass(AnimeComment)

export { AnimeComment, AnimeCommentDocument, AnimeCommentSchema }
