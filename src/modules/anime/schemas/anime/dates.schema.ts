import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "Dates", _id: false, versionKey: false })
class Dates {
  @Prop({ type: Date, default: null })
  airedAt: Date | null

  @Prop({ type: Date, default: null })
  releasedOn: Date | null
}

type DatesDocument = HydratedDocument<Dates>
const DatesSchema = SchemaFactory.createForClass(Dates)

export { DatesDocument, DatesSchema }
