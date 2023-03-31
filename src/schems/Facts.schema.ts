import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type FactsDocument = HydratedDocument<Facts>

@Schema({ collection: "Facts" })
export class Facts {
  @Prop({ unique: true }) fact: string
}

export const FactsSchema = SchemaFactory.createForClass(Facts)
