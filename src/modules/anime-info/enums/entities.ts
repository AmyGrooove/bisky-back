import { registerEnumType } from "@nestjs/graphql"

export enum KindEnum {
  tv = "tv",
  movie = "movie",
  ova = "ova",
  ona = "ona",
  special = "special",
  music = "music",
}

export enum StatusEnum {
  anons = "anons",
  ongoing = "ongoing",
  released = "released",
}

export enum RatingEnum {
  none = "none",
  g = "g",
  pg = "pg",
  pg_13 = "pg_13",
  r = "r",
  r_plus = "r_plus",
  rx = "rx",
}

registerEnumType(KindEnum, {
  name: "KindEnum",
})
registerEnumType(StatusEnum, {
  name: "StatusEnum",
})
registerEnumType(RatingEnum, {
  name: "RatingEnum",
})
