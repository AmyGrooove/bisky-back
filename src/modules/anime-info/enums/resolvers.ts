import { registerEnumType } from "@nestjs/graphql"

export enum sortType {
  best = "best",
  ongoing = "ongoing",
  last = "last",
}

registerEnumType(sortType, {
  name: "sortType",
})
