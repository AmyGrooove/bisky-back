import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { ERole } from "../../../auxiliary"
import {
  UserPersonalizationSchema,
  UserPersonalizationDocument,
} from "./additional/userPersonalization.schema"
import { FavoriteSchema, FavoriteDocument } from "./additional/favorite.schema"
import {
  SkippedAnimeDocument,
  SkippedAnimeSchema,
} from "./additional/skippedAnime.schema"

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

  @Prop({ type: [SkippedAnimeSchema], default: [] })
  skippedAnime: SkippedAnimeDocument[]

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: [], ref: "User" })
  subscriptions: ObjectId[]

  @Prop({ type: UserPersonalizationSchema, default: {} })
  userPersonalization: UserPersonalizationDocument

  @Prop({ type: FavoriteSchema, default: {} })
  favorites: FavoriteDocument
}

type UserDocument = HydratedDocument<User>
const UserSchema = SchemaFactory.createForClass(User)

export { User, UserSchema, type UserDocument }
