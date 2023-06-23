import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type AnimeInfoDocument = HydratedDocument<AnimeInfo>

@Schema({ collection: "AnimeInfo", versionKey: false })
export class AnimeInfo {
  @Prop({ required: true, unique: true })
  id: number

  @Prop({
    type: [{ type: String }],
    required: true,
    set: (value) => {
      const [first, second, ...sortArr] = Array.from(new Set(value))
      return [first, second, ...sortArr.sort()].filter((item) => item !== null)
    },
  })
  labels: string[]

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    set: (value: string) =>
      value.indexOf("missing") === -1
        ? value.slice(0, -15).substring(24)
        : null,
  })
  poster: string | null

  @Prop({ enum: ["tv", "movie", "ova", "ona", "special", "music"] })
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"

  @Prop({ type: Number })
  scores: number

  @Prop({ type: Number, set: (value: string) => Number(value) })
  anotherScores: number[]

  @Prop({ required: true, enum: ["anons", "ongoing", "released"] })
  status: "anons" | "ongoing" | "released"

  @Prop({
    type: {
      count: mongoose.Schema.Types.Mixed,
      aired: mongoose.Schema.Types.Mixed,
      duration: mongoose.Schema.Types.Mixed,
      nextEpisodeAt: mongoose.Schema.Types.Mixed,
    },
    count: { set: (value: number) => (value !== 0 ? value : null) },
    aired: { set: (value: number) => (value !== 0 ? value : null) },
    nextEpisodeAt: {
      set: (value: string) => (value ? new Date(value) : null),
    },
  })
  episodes: {
    count: number | null
    aired: number | null
    duration: number
    nextEpisodeAt: Date | null
  }

  @Prop({
    type: {
      airedOn: mongoose.Schema.Types.Mixed,
      releasedOn: mongoose.Schema.Types.Mixed,
    },
    airedOn: { set: (value: string) => (value ? new Date(value) : null) },
    releasedOn: { set: (value: string) => (value ? new Date(value) : null) },
  })
  dates: { airedOn: Date | null; releasedOn: Date | null }

  @Prop({ enum: ["none", "g", "pg", "pg_13", "r", "r_plus", "rx"] })
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"

  @Prop({
    type: String,
    set: (value: string) =>
      value
        ? value
            .replace(/<(?!br\s*\/?)[^>]*>/gi, "")
            .replace(/<br\s[^>]*>/gi, "<br>")
            .replace(/\[[^\]]*\]/g, "")
            .replace(/\r\n/g, "<br>")
        : null,
  })
  description: string | null

  @Prop([
    { type: String, set: (value: string) => value.slice(0, -15).substring(29) },
  ])
  screenshots: string[]

  @Prop([
    {
      type: String,
      set: (value: string) =>
        value.replace("youtube.com", "youtu.be").replace("watch?v=", ""),
    },
  ])
  videos: string[]

  @Prop({ type: [Number], ref: "Genres" })
  genres: number[]

  @Prop({ type: [Number], ref: "Studios" })
  studios: number[]

  @Prop({
    type: {
      name: String,
      anime: {
        id: Number,
        relation: { en: String, ru: String },
      },
    },
    animes: [{ id: Number, relation: { en: String, ru: String } }],
  })
  franchise: {
    name: string | null
    animes: [{ id: number; relation: { en: string; ru: string } }]
  }

  @Prop({ required: true })
  updateDate: Date
}

export const AnimeInfoSchema = SchemaFactory.createForClass(AnimeInfo)
