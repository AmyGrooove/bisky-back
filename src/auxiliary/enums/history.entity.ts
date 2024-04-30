import { registerEnumType } from "@nestjs/graphql"

enum EHistory {
  watchedEpisode = "watchedEpisode",
  added = "added",
  scored = "scored",
  changedEstimateType = "changedEstimateType",
  deleted = "deleted",
}

registerEnumType(EHistory, {
  name: "EHistoryEnum",
  description: "AnimeEstimate history type",
})

export { EHistory }
