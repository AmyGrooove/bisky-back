export interface Anime {
  shiki_id: number;
  label: AnimeName;
  all_labels: string[];
  image: string;
  url: string;
  kind: string;
  score: number;
  status: string;
  episodes: number;
  episodes_aired: number;
  aired_on: string;
  released_on: string | null;
  rating: string;
  duration: number;
  description: string | null;
  franchise: string | null;
  next_episode_at: string | null;
  genres: number[];
  studios_id: number[];
  videos: string[];
  screenshots: string[];
}

export interface AnimeName {
  ru: string;
  en: string | null;
}

export interface HomeAnime {
  shiki_id: number;
  name: string;
  image: string;
  score: number;
  screenshots: string[];
  genres: string[];
}
