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
class Relations {
  @Field({ nullable: true })
  name: string | null
  @Field(() => [RelationAnime])
  animes: [{ id: number; relation: { en: string; ru: string } }]
}

@ObjectType()
class RelationAnime {
  @Field(() => Int)
  id: number

  @Field(() => AnimeName)
  relation: { en: string; ru: string }
}

@ObjectType()
class AnimeName {
  @Field()
  en: string

  @Field()
  ru: string
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

  @Field(() => [Int])
  genres: number[]

  @Field(() => [Int])
  studios: number[]

  @Field(() => Relations)
  franshise: {
    name: string | null
    animes: [{ id: number; relation: { en: string; ru: string } }]
  }

  @Field()
  updateDate: Date
}
