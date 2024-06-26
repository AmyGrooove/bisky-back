import { registerEnumType } from "@nestjs/graphql"

enum EKind {
  tv = "tv",
  movie = "movie",
  ova = "ova",
  ona = "ona",
  special = "special",
  music = "music",
  tv_special = "tv_special",
  none = "none",
  pv = "pv",
  cm = "cm",
}

registerEnumType(EKind, { name: "KindEnum", description: "Anime type" })

export { EKind }
