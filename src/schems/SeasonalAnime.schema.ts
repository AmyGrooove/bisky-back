import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeasonalAnimeDocument = HydratedDocument<SeasonalAnime>;

@Schema({ collection: 'SeasonalAnime' })
export class SeasonalAnime {
  @Prop({ required: true })
  shiki_id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  score: number;

  @Prop()
  screenshots: string[];

  @Prop()
  genres: string[];
}

export const SeasonalAnimeSchema = SchemaFactory.createForClass(SeasonalAnime);
