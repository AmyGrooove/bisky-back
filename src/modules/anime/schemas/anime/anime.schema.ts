import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { LabelsSchema, LabelsDocument } from "./labels.schema"
import {
  OtherPlatformSchema,
  OtherPlatformDocument,
} from "./otherPlatform.schema"
import { EpisodesDocument, EpisodesSchema } from "./episodes.schema"
import { DatesDocument, DatesSchema } from "./dates.schema"
import {
  EKind,
  ERating,
  EStatus,
  LanguageDocument,
  LanguageSchema,
} from "../../../../auxiliary"
import { RelatedAnimeDocument, RelatedAnimeSchema } from "./relatedAnime.schema"
import { VideoDocument, VideoSchema } from "./video.schema"

@Schema({ collection: "Anime", versionKey: false })
class Anime {
  @Prop({ type: Number, required: true, unique: true })
  shikiId: number

  @Prop({ type: LabelsSchema, default: {} })
  labels: LabelsDocument

  @Prop({ type: String, default: null })
  poster: string | null

  @Prop({ type: String, enum: EKind, default: EKind.none })
  kind: EKind

  @Prop({ type: OtherPlatformSchema, default: [] })
  otherPlatforms: OtherPlatformDocument[]

  @Prop({ type: String, enum: EStatus, default: EStatus.anons })
  status: EStatus

  @Prop({ type: EpisodesSchema, default: {} })
  episodes: EpisodesDocument

  @Prop({ type: DatesSchema, default: {} })
  dates: DatesDocument

  @Prop({ type: String, enum: ERating, default: ERating.none })
  rating: ERating

  @Prop({ type: LanguageSchema, default: {} })
  description: LanguageDocument

  @Prop({ type: [RelatedAnimeSchema], default: [] })
  related: RelatedAnimeDocument[]

  @Prop({ type: [String], default: [] })
  screenshots: string[]

  @Prop({ type: [VideoSchema], default: [] })
  videos: VideoDocument[]

  @Prop({ type: [mongoose.Types.ObjectId], default: [], ref: "Genre" })
  genres: ObjectId[]

  @Prop({ type: [mongoose.Types.ObjectId], default: [], ref: "Studio" })
  studios: ObjectId[]

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Franchise",
    default: null,
  })
  franchise: ObjectId | null

  @Prop({ type: Date, required: true })
  updateDate: Date
}

type AnimeDocument = HydratedDocument<Anime>
const AnimeSchema = SchemaFactory.createForClass(Anime)

export { Anime, AnimeSchema, type AnimeDocument }
