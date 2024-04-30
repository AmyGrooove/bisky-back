import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"

@Schema({ collection: "Favorite", _id: false, versionKey: false })
class Favorite {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Anime" })
  animeIds: ObjectId[]
}

type FavoriteDocument = HydratedDocument<Favorite>
const FavoriteSchema = SchemaFactory.createForClass(Favorite)

export { FavoriteDocument, FavoriteSchema }
