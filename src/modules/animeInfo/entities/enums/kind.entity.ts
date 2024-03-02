import { registerEnumType } from "@nestjs/graphql"

enum KindEnum {
  tv = "tv",
  movie = "movie",
  ova = "ova",
  ona = "ona",
  special = "special",
  music = "music",
  none = "none",
}

registerEnumType(KindEnum, { name: "KindEnum", description: "Anime type" })

export { KindEnum }
