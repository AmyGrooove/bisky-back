import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type AnimeInfoDocument = HydratedDocument<AnimeInfo>

@Schema({ collection: "AnimeInfo" })
export class AnimeInfo {
  @Prop({ required: true, unique: true })
  shiki_id: number

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
    set: (value) =>
      value.indexOf("missing") === -1
        ? value.slice(0, -15).substring(24)
        : null,
  })
  poster: string | null

  @Prop({ enum: ["tv", "movie", "ova", "ona", "special", "music"] })
  kind: string

  @Prop({ type: Number, set: (value) => Number(value) })
  scores: number[]

  @Prop({ required: true, enum: ["anons", "ongoing", "released"] })
  status: string

  @Prop({
    type: {
      count: mongoose.Schema.Types.Mixed,
      aired: mongoose.Schema.Types.Mixed,
      duration: Number,
      next_episode_at: mongoose.Schema.Types.Mixed,
    },
    count: { set: (value) => (value !== 0 ? value : null) },
    aired: { set: (value) => (value !== 0 ? value : null) },
    next_episode_at: { set: (value) => (value ? new Date(value) : null) },
  })
  episodes: {
    count: number | null
    aired: number | null
    duration: number
    next_episode_at: Date | null
  }

  @Prop({
    type: {
      aired_on: mongoose.Schema.Types.Mixed,
      released_on: mongoose.Schema.Types.Mixed,
    },
    aired_on: { set: (value) => (value ? new Date(value) : null) },
    released_on: { set: (value) => (value ? new Date(value) : null) },
  })
  dates: { aired_on: Date | null; released_on: Date | null }

  @Prop({ enum: ["none", "g", "pg", "pg_13", "r", "r_plus", "rx"] })
  rating: string

  @Prop({
    type: String,
    set: (value) =>
      value
        ? value
            .replace(/<(?!br\s*\/?)[^>]*>/gi, "")
            .replace(/<br\s[^>]*>/gi, "<br>")
            .replace(/\[[^\]]*\]/g, "")
            .replace(/\r\n/g, "<br>")
        : null,
  })
  description: string | null

  @Prop([{ type: String, set: (value) => value.slice(0, -15).substring(29) }])
  screenshots: string[]

  @Prop([
    {
      type: String,
      set: (value) =>
        value.replace("youtube.com", "youtu.be").replace("watch?v=", ""),
    },
  ])
  videos: string[]

  @Prop({ type: [Number] })
  genres: number[]

  @Prop({ type: [Number] })
  studios: number[]

  @Prop({
    type: {
      franchise: mongoose.Schema.Types.Mixed,
      anime: {
        link_id: Number,
        relation: { en: String, ru: String },
      },
    },
    franchise: { set: (value) => (value ? value : null) },
    animes: [{ link_id: Number, relation: { en: String, ru: String } }],
  })
  relations: {
    franchise: string | null
    animes: [{ link_id: number; relation: { en: string; ru: string } }]
  }

  @Prop({ required: true })
  updateDate: Date
}

export const AnimeInfoSchema = SchemaFactory.createForClass(AnimeInfo)
