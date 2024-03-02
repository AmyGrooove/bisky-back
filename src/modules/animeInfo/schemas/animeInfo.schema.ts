import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

export type AnimeInfoDocument = HydratedDocument<AnimeInfo>

@Schema({ collection: "AnimeInfo", versionKey: false })
export class AnimeInfo {
  @Prop({ required: true, unique: true })
  shikiId: number

  @Prop({
    type: {
      ru: { type: [String] },
      en: { type: [String] },
      others: { type: [String] },
    },
  })
  labels: { ru: string[]; en: string[]; others: string[] }

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  poster: string | null

  @Prop({
    enum: ["tv", "movie", "ova", "ona", "special", "music", "none"],
    default: "none",
  })
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music" | "none"

  @Prop({
    type: { general: { type: Number }, allEpisodes: { type: Number } },
    default: { general: 0, allEpisodes: 0 },
  })
  scores: { general: number; allEpisodes: number }

  @Prop([
    {
      type: {
        score: { type: Number },
        url: { type: mongoose.Schema.Types.Mixed },
        platform: { type: mongoose.Schema.Types.ObjectId },
      },
      default: { score: 0, url: null },
      ref: { platform: "Platforms" },
    },
  ])
  otherPlatforms: { score: number; url: string | null; platform: ObjectId }

  @Prop({ enum: ["anons", "ongoing", "released"], default: "anons" })
  status: "anons" | "ongoing" | "released"

  @Prop({
    type: {
      count: { type: Number },
      aired: { type: Number },
      isUnlimitedSeries: { type: Boolean },
      averageDuration: { type: Number },
      singleEpisodes: {
        type: {
          name: { type: mongoose.Schema.Types.Mixed },
          aired: { type: mongoose.Schema.Types.Mixed },
          duration: { type: Number },
          score: { type: Number },
        },
      },
    },
    default: {
      count: 0,
      aired: 0,
      isUnlimitedSeries: false,
      averageDuration: 0,
      singleEpisodes: { name: null, aired: null, duration: 0, score: 0 },
    },
  })
  episodes: {
    count: number
    aired: number
    isUnlimitedSeries: boolean
    averageDuration: number
    singleEpisodes: {
      name: string | null
      airedAt: Date | null
      duration: number
      score: number
    }[]
  }

  @Prop({
    type: {
      airedOn: { type: mongoose.Schema.Types.Mixed },
      releasedOn: { type: mongoose.Schema.Types.Mixed },
    },
    default: { airedOn: null, releasedOn: null },
  })
  dates: { airedOn: Date | null; releasedOn: Date | null }

  @Prop({
    enum: ["g", "pg", "pg_13", "r", "r_plus", "rx", "none"],
    default: "none",
  })
  rating: "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx" | "none"

  @Prop({
    type: {
      en: { type: mongoose.Schema.Types.Mixed },
      ru: { type: mongoose.Schema.Types.Mixed },
    },
    default: { en: null, ru: null },
  })
  description: { ru: string | null; en: string | null }

  @Prop([String])
  screenshots: string[]

  @Prop([
    {
      type: String,
      set: (value: string) =>
        value.replace("youtube.com", "youtu.be").replace("watch?v=", ""),
    },
  ])
  videos: string[]

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Genres" }])
  genres: ObjectId[]

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Studios" }])
  studios: ObjectId[]

  @Prop({ type: mongoose.Schema.Types.Mixed, ref: "Franchises", default: null })
  franchise: ObjectId | null

  @Prop({ required: true, default: new Date() })
  updateDate: Date
}

export const AnimeInfoSchema = SchemaFactory.createForClass(AnimeInfo)
