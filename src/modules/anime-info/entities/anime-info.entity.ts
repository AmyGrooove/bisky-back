import { ObjectType, Field, Int } from "@nestjs/graphql"
import { KindEnum, RatingEnum, StatusEnum } from "../enums/entities"
import { GenresModel } from "../../additional-info/entities/genres.entity"
import { StudiosModel } from "../../additional-info/entities/studios.entity"
import { Language } from "../../additional-info/entities/additional.entity"

@ObjectType()
class Episodes {
  @Field(() => Int, { nullable: true })
  count: number | null

  @Field(() => Int, { nullable: true })
  aired: number | null

  @Field(() => Int)
  duration: number

  @Field({ nullable: true })
  next_episode_at: Date | null
}

@ObjectType()
class Dates {
  @Field({ nullable: true })
  aired_on: Date | null

  @Field({ nullable: true })
  released_on: Date | null
}

@ObjectType()
class RelationInfo {
  @Field({ nullable: true })
  name: string | null

  @Field(() => [RelationInfoAnime])
  animes: {
    id: number
    relation: { en: string; ru: string }
    labels: string[]
    poster: string | null
    kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
    scores: number
    anotherScores: number[]
    status: "anons" | "ongoing" | "released"
  }[]
}

@ObjectType()
class RelationInfoAnime {
  @Field(() => Language)
  relation: { en: string; ru: string }

  @Field(() => Int)
  id: number

  @Field(() => [String])
  labels: string[]

  @Field({ nullable: true })
  poster: string | null

  @Field(() => KindEnum)
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"

  @Field(() => Number)
  scores: number

  @Field(() => [Number], { nullable: true })
  anotherScores: number[]

  @Field(() => StatusEnum)
  status: "anons" | "ongoing" | "released"
}

@ObjectType()
export class AnimeInfoModel {
  @Field(() => Int)
  id: number

  @Field(() => [String])
  labels: string[]

  @Field({ nullable: true })
  poster: string | null

  @Field(() => KindEnum)
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"

  @Field(() => Number)
  scores: number

  @Field(() => [Number], { nullable: true })
  anotherScores: number[]

  @Field(() => StatusEnum)
  status: "anons" | "ongoing" | "released"

  @Field(() => Episodes)
  episodes: {
    count: number | null
    aired: number | null
    duration: number
    next_episode_at: Date | null
  }

  @Field(() => Dates)
  dates: { aired_on: Date | null; released_on: Date | null }

  @Field(() => RatingEnum)
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"

  @Field({ nullable: true })
  description: string | null

  @Field(() => [String])
  screenshots: string[]

  @Field(() => [String])
  videos: string[]

  @Field(() => [GenresModel])
  genres: {
    link_id: {
      anime: number | null
      manga: number
    }
    name: {
      en: string
      ru: string
    }
    hentai: boolean
  }[]

  @Field(() => [StudiosModel])
  studios: {
    id: number
    name: string
    img: string | null
  }[]

  @Field(() => RelationInfo, { nullable: true })
  franshise: {
    name: string | null
    animes: {
      id: number
      relation: { en: string; ru: string }
      labels: string[]
      poster: string | null
      kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
      scores: number
      anotherScores: number[]
      status: "anons" | "ongoing" | "released"
    }[]
  } | null

  @Field()
  updateDate: Date
  el: {
    id: number
    relation: {
      en: string
      ru: string
    }
    labels: string[]
    poster: string | null
    kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
    scores: number
    anotherScores: number[]
    status: "anons" | "ongoing" | "released"
  }[]
}
