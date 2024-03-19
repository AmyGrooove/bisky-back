import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { HydratedDocument } from "mongoose"
import { ERole } from "../../../auxiliary"

@Schema({ collection: "User", versionKey: false })
class User {
  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  username: string

  @Prop({ type: String, required: true })
  passwordHash: string

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  email: string

  @ApiProperty({ nullable: true })
  @Prop({ type: String, default: null })
  avatar: string | null

  @Prop({ type: String, default: null })
  refreshToken: string | null

  @ApiProperty({ enum: ERole })
  @Prop({ type: String, enum: ERole, default: ERole.user })
  role: ERole

  @ApiProperty()
  @Prop({ type: Date, set: () => new Date(), default: new Date() })
  lastOnlineDate: Date
}

type UserDocument = HydratedDocument<User>
const UserSchema = SchemaFactory.createForClass(User)

export { User, UserSchema, type UserDocument }
