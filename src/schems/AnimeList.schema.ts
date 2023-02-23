import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimeListDocument = HydratedDocument<AnimeList>;

@Schema({ collection: 'AnimeLabels' })
class AnimeLabels {
  @Prop()
  ru: string;

  @Prop()
  en: string | null;
}

@Schema({ collection: 'AnimeList' })
export class AnimeList {
  @Prop()
  shiki_id: number;

  @Prop()
  label: AnimeLabels;

  @Prop()
  all_labels: string[];

  @Prop()
  image: string;

  @Prop()
  url: string;

  @Prop()
  kind: string;

  @Prop()
  score: number;

  @Prop()
  status: string;

  @Prop()
  episodes: number;

  @Prop()
  episodes_aired: number;

  @Prop()
  aired_on: string;

  @Prop()
  released_on: string | null;

  @Prop()
  rating: string;

  @Prop()
  duration: number;

  @Prop()
  description: string | null;

  @Prop()
  franchise: string | null;

  @Prop()
  next_episode_at: string | null;

  @Prop()
  genres: number[];

  @Prop()
  studios_id: number[];

  @Prop()
  videos: string[];

  @Prop()
  screenshots: string[];
}

export const AnimeListSchema = SchemaFactory.createForClass(AnimeList);
