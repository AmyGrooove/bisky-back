import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimeListDocument = HydratedDocument<AnimeList>;

@Schema({ collection: 'RusEngLabels' })
class RusEngLabels {
  @Prop() ru: string | null;

  @Prop() en: string | null;
}

@Schema({ collection: 'Genres' })
class Genres {
  @Prop() genre_id: number;

  @Prop() name: RusEngLabels;
}

@Schema({ collection: 'Studio' })
class Studio {
  @Prop() studio_id: number;

  @Prop() name: string;

  @Prop() image: string | null;
}

@Schema({ collection: 'Relation' })
class Relation {
  @Prop() shiki_id: number;

  @Prop() relation: RusEngLabels;

  @Prop() label: RusEngLabels;

  @Prop() image: string;
}

@Schema({ collection: 'AnimeList' })
export class AnimeList {
  @Prop({ unique: true }) shiki_id: number;

  @Prop() label: RusEngLabels;

  @Prop() all_labels: string[];

  @Prop() image: string | null;

  @Prop() kind: string;

  @Prop() score: number;

  @Prop() status: string;

  @Prop() episodes: number;

  @Prop() episodes_aired: number;

  @Prop() aired_on: string;

  @Prop() released_on: string | null;

  @Prop() rating: string;

  @Prop() duration: number;

  @Prop() description: string | null;

  @Prop() franchise: string | null;

  @Prop() next_episode_at: string | null;

  @Prop() genres: Genres[];

  @Prop() studios: Studio[];

  @Prop() videos: string[];

  @Prop() screenshots: string[];

  @Prop() relations: Relation[];
}

export const AnimeListSchema = SchemaFactory.createForClass(AnimeList);
