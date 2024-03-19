import { registerEnumType } from "@nestjs/graphql"

enum ERole {
  user = "user",
  moderator = "moderator",
  admin = "admin",
}

registerEnumType(ERole, {
  name: "RoleEnum",
  description: "User's role on the project",
})

export { ERole }
