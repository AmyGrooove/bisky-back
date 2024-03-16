import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { EStatus } from "../../../../auxiliary"

@Schema({ collection: "AnimeList", versionKey: false })
class AnimeList {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
  author: ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Anime" })
  base: ObjectId

  @Prop({ type: Date, required: true, set: () => new Date() })
  createTime: Date

  @Prop({ type: String, enum: EStatus, required: true })
  status: EStatus
}

type AnimeListDocument = HydratedDocument<AnimeList>
const AnimeListSchema = SchemaFactory.createForClass(AnimeList)

export { AnimeList, AnimeListDocument, AnimeListSchema }
