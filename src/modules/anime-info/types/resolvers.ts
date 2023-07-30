import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql"
import { KindEnum, RatingEnum, StatusEnum } from "./entities"

export enum sortType {
  best = "best",
  ongoing = "ongoing",
  last = "last",
}

registerEnumType(sortType, {
  name: "sortType",
})

@InputType()
class airedOnFilter {
  @Field(() => Date)
  from: Date

  @Field(() => Date, { nullable: true })
  to?: Date
}

@InputType()
export class FilterArgs {
  @Field(() => KindEnum, { nullable: true })
  kind?: "tv" | "movie" | "ova" | "ona" | "special" | "music"

  @Field(() => StatusEnum, { nullable: true })
  status?: "anons" | "ongoing" | "released"

  @Field(() => RatingEnum, { nullable: true })
  rating?: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"

  @Field(() => airedOnFilter, {
    nullable: true,
    description: "Format: YYYY.MM.DD",
  })
  airedOn?: {
    from: Date
    to?: Date
  }

  @Field(() => [Int], { nullable: true })
  genres?: number[]

  @Field(() => [Int], { nullable: true })
  studios?: number[]

  @Field({ nullable: true })
  franchiseName?: string

  @Field(() => Int, { nullable: true })
  screenshotsCount?: number
}

@InputType()
export class SortArgs {
  @Field(() => Boolean, { nullable: true })
  scores?: boolean

  @Field(() => Boolean, { nullable: true })
  airedOn?: boolean

  @Field(() => Boolean, { nullable: true })
  updateDate?: boolean
}
