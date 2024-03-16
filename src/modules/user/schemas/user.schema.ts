import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "User", versionKey: false })
class User {
  @Prop({ type: String, required: true, unique: true })
  username: string

  @Prop({ type: String, required: true })
  passwordHash: string

  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String, default: null })
  avatar: string | null

  @Prop({ type: String, default: null })
  refreshToken: string | null
}

type UserDocument = HydratedDocument<User>
const UserSchema = SchemaFactory.createForClass(User)

export { User, UserSchema, type UserDocument }
