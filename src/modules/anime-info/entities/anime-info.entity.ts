import { ObjectType, Field, Int } from "@nestjs/graphql"

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
class Language {
  @Field()
  en: string

  @Field()
  ru: string
}

@ObjectType()
class GenresModel {
  @Field()
  id: number

  @Field(() => Language)
  name: { en: string; ru: string }

  @Field({ nullable: true })
  type: "anime" | "manga" | null
}

@ObjectType()
class StudiosModel {
  @Field()
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  img: string | null
}

@ObjectType()
export class AnimeInfoModel {
  @Field(() => Int)
  id: number

  @Field(() => [String])
  labels: string[]

  @Field({ nullable: true })
  poster: string | null

  @Field()
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"

  @Field(() => Number)
  scores: number

  @Field(() => [Number], { nullable: true })
  anotherScores: number[]

  @Field()
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

  @Field()
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"

  @Field({ nullable: true })
  description: string | null

  @Field(() => [String])
  screenshots: string[]

  @Field(() => [String])
  videos: string[]

  @Field(() => [GenresModel])
  genres: {
    id: number
    name: {
      en: string
      ru: string
    }
    type: "anime" | "manga" | null
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
  }

  @Field()
  updateDate: Date
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

  @Field()
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"

  @Field(() => Number)
  scores: number

  @Field(() => [Number], { nullable: true })
  anotherScores: number[]

  @Field()
  status: "anons" | "ongoing" | "released"
}
