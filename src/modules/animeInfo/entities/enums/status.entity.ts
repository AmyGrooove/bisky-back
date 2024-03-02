import { registerEnumType } from "@nestjs/graphql"

enum StatusEnum {
  anons = "anons",
  ongoing = "ongoing",
  released = "released",
}

registerEnumType(StatusEnum, {
  name: "StatusEnum",
  description: "Release status of this anime",
})

export { StatusEnum }
