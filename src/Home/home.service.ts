import { Injectable } from '@nestjs/common';
import { http, shikimori_api } from '../../constants';
import { firstValueFrom } from 'rxjs';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=10';

export interface Anime {
  id: number;
  name: string;
  russian: string;
  image: Image;
  url: string;
  kind: string;
  score: string;
  status: string;
  episodes: number;
  episodes_aired: number;
  aired_on: string;
  released_on: any;
}

interface Image {
  original: string;
  preview: string;
  x96: string;
  x48: string;
}

@Injectable()
export class HomeService {
  async getNewTitles() {
    const animes = await http<Anime[]>(shikimori_api + 'animes' + newTitlesUrl);

    return animes;
  }
}
