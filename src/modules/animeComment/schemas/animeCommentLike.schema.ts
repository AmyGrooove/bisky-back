import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

@Schema({ collection: "AnimeCommentLike", versionKey: false })
class AnimeCommentLike {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
  author: ObjectId

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "AnimeComment",
  })
  base: ObjectId

  @Prop({ type: Date, required: true, set: () => new Date() })
  createTime: Date

  @Prop({ type: Boolean, required: true })
  isLiked: boolean
}

type AnimeCommentLikeDocument = HydratedDocument<AnimeCommentLike>
const AnimeCommentLikeSchema = SchemaFactory.createForClass(AnimeCommentLike)

export { AnimeCommentLike, AnimeCommentLikeDocument, AnimeCommentLikeSchema }
