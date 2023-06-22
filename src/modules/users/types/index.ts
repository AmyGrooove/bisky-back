import { ObjectId } from "mongoose"

export type FindByUsername = {
  _id: ObjectId
  username: string
  image: string | null
  role: string
  name: string | null
}
