import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type FactsDocument = HydratedDocument<Facts>

@Schema({ collection: "Facts", versionKey: false })
export class Facts {
  @Prop({ type: String })
  fact: string
}

export const FactsSchema = SchemaFactory.createForClass(Facts)
