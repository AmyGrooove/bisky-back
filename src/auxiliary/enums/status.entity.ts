import { registerEnumType } from "@nestjs/graphql"

enum EStatus {
  anons = "anons",
  ongoing = "ongoing",
  released = "released",
}

registerEnumType(EStatus, {
  name: "StatusEnum",
  description: "Release status of this anime",
})

export { EStatus }
