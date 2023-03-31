import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type PlatformDocument = HydratedDocument<Platform>

@Schema({ collection: "Platform" })
export class Platform {
  @Prop({ required: true, unique: true }) platform_id: number

  @Prop() name: string

  @Prop() icon: string

  @Prop() url: string
}

export const PlatformSchema = SchemaFactory.createForClass(Platform)
