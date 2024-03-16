import { registerEnumType } from "@nestjs/graphql"

enum EListStatus {
  added = "added",
  watching = "watching",
  completed = "completed",
  dropped = "dropped",
}

registerEnumType(EListStatus, {
  name: "ListStatusEnum",
  description: "The status the user added to",
})

export { EListStatus }
