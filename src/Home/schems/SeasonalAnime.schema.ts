import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeasonalAnimeDocument = HydratedDocument<SeasonalAnime>;

@Schema({ collection: 'SeasonalAnime' })
export class SeasonalAnime {
  @Prop()
  shiki_id: number;

  @Prop()
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
