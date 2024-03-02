import { registerEnumType } from "@nestjs/graphql"

enum RatingEnum {
  g = "g",
  pg = "pg",
  pg_13 = "pg_13",
  r = "r",
  r_plus = "r_plus",
  rx = "rx",
  none = "none",
}

registerEnumType(RatingEnum, {
  name: "RatingEnum",
  description: "Anime age rating",
})

export { RatingEnum }
