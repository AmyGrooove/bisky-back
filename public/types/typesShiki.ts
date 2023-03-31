export interface RelationAnimes {
  relation: string
  relation_russian: string
  anime: AnimeShort | null
  manga: Manga | null
}

export interface AnimeShort {
  id: number
  name: string
  russian: string
  image: Image
  url: string
  kind: string
  score: string
  status: string
  episodes: number
  episodes_aired: number
  aired_on: string
  released_on?: string
}

export interface Manga {
  id: number
  name: string
  russian: string
  image: Image
  url: string
  kind: string
  score: string
  status: string
  volumes: number
  chapters: number
  aired_on: string
  released_on: any
}

export interface AnimeFull {
  id: number
  name: string
  russian: string
  image: Image
  url: string
  kind: string
  score: string
  status: string
  episodes: number
  episodes_aired: number
  aired_on: string
  released_on: string
  rating: string
  english: string[]
  japanese: string[]
  synonyms: any[]
  license_name_ru: string
  duration: number
  description: string
  description_html: string
  description_source: any
  franchise: any
  favoured: boolean
  anons: boolean
  ongoing: boolean
  thread_id: number
  topic_id: number
  myanimelist_id: number
  rates_scores_stats: RatesScoresStat[]
  rates_statuses_stats: RatesStatusesStat[]
  updated_at: string
  next_episode_at: any
  fansubbers: string[]
  fandubbers: string[]
  licensors: string[]
  genres: Genre[]
  studios: Studio[]
  videos: Video[]
  screenshots: Screenshot[]
  user_rate: any
}

export interface Image {
  original: string
  preview: string
  x96: string
  x48: string
}

export interface RatesScoresStat {
  name: number
  value: number
}

export interface RatesStatusesStat {
  name: string
  value: number
}

export interface Genre {
  id: number
  name: string
  russian: string
  kind: string
}

export interface Studio {
  id: number
  name: string
  filtered_name: string
  real: boolean
  image: string | null
}

export interface Video {
  id: number
  url: string
  image_url: string
  player_url: string
  name: string
  kind: string
  hosting: string
}

export interface Screenshot {
  original: string
  preview: string
}
