import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type StudiosDocument = HydratedDocument<Studios>

@Schema({ collection: "Studios", versionKey: false })
export class Studios {
  @Prop({ required: true, unique: true, ref: "AnimeInfo" })
  id: number

  @Prop({ type: String })
  name: string

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    set: (value: string) => (value ? value.slice(0, -15).substring(25) : null),
  })
  img: string | null
}

export const StudiosSchema = SchemaFactory.createForClass(Studios)
