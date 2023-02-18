import { Injectable } from '@nestjs/common';
import { http, shikimori_api } from '../../constants';
import { AniemShort, AnimeFull, Screenshot } from '../../constants/types';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=10';

export interface HomeAnime {
  id: number;
  name: string;
  image: string;
  score: string;
  screenshots: string[];
  genres: string[];
}

@Injectable()
export class HomeService {
  async getNewTitles() {
    const home_animes: HomeAnime[] = [];

    const animes = await http<AniemShort[]>(
      shikimori_api + 'animes' + newTitlesUrl,
    );

    for (const el of animes) {
      const genres = (
        await http<AnimeFull>(shikimori_api + 'animes/' + el.id)
      ).genres.map((item) => item.russian);

      const screenshots = (
        await http<Screenshot[]>(
          shikimori_api + 'animes/' + el.id + '/screenshots',
        )
      ).map((item) => 'https://shikimori.one' + item.original.slice(0, -11));
      screenshots.length = 10;

      await new Promise((res) => setTimeout(res, 260));

      home_animes.push({
        id: el.id,
        name: el.russian,
        image: el.image.original.slice(0, -11),
        score: el.score,
        screenshots: screenshots,
        genres: genres,
      });
    }

    return home_animes;
  }
}
