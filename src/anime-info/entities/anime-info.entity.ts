import { ObjectType, Field, ID, Int } from "@nestjs/graphql"

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
  @Field(() => ID, { nullable: true })
  franchise: string | null
  @Field(() => [RelationAnime])
  animes: [{ link_id: number; relation: { en: string; ru: string } }]
}

@ObjectType()
class RelationAnime {
  @Field(() => ID)
  link_id: number

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
  shiki_id: number

  @Field(() => [String])
  labels: string[]

  @Field({ nullable: true })
  poster: string | null

  @Field()
  kind: string

  @Field(() => [Number], { nullable: true })
  scores: number[]

  @Field()
  status: string

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
  rating: string

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
  relations: {
    franchise: string | null
    animes: [{ link_id: number; relation: { en: string; ru: string } }]
  }

  @Field()
  updateDate: Date
}
