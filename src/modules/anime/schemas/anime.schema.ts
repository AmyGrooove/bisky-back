import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import {
  EKind,
  EStatus,
  ERating,
  LanguageSchema,
  LanguageDocument,
} from "../../../auxiliary"
import { DatesSchema, DatesDocument } from "./additional/dates.schema"
import { EpisodesSchema, EpisodesDocument } from "./additional/episodes.schema"
import { LabelsSchema, LabelsDocument } from "./additional/labels.schema"
import {
  OtherPlatformSchema,
  OtherPlatformDocument,
} from "./additional/otherPlatform.schema"
import {
  RelatedAnimeSchema,
  RelatedAnimeDocument,
} from "./additional/relatedAnime.schema"
import { VideoSchema, VideoDocument } from "./additional/video.schema"

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
