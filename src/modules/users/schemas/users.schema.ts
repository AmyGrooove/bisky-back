import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument, Document } from "mongoose"

export type UsersDocument = HydratedDocument<Users>

@Schema({ collection: "Users", versionKey: false })
export class Users extends Document {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: null })
  image: string | null

  @Prop({ default: "user" })
  role: string

  @Prop({ default: null })
  name: string | null

  @Prop({ default: null })
  refreshToken: string | null
}

export const UsersSchema = SchemaFactory.createForClass(Users)
