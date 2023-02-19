import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SeasonalAnime,
  SeasonalAnimeDocument,
} from './schems/SeasonalAnime.schema';
import { http, newTitlesUrl, shikimori_api } from '../../constants';
import { AniemShort, AnimeFull, HomeAnime, Screenshot } from 'constants/types';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(SeasonalAnime.name)
    private seasonalModelModule: Model<SeasonalAnimeDocument>,
  ) {}

  async getSeasonal(): Promise<SeasonalAnime[]> {
    return this.seasonalModelModule.find().exec();
  }

  async updateSeasonal() {
    try {
      const newSeasonalAnime: HomeAnime[] = [];

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

        await new Promise((res) => setTimeout(res, 300));

        newSeasonalAnime.push({
          shiki_id: el.id,
          name: el.russian,
          image: 'https://shikimori.one' + el.image.original.slice(0, -11),
          score: Number(el.score),
          screenshots: screenshots,
          genres: genres,
        });
      }

      await this.seasonalModelModule.remove();
      await this.seasonalModelModule.insertMany(newSeasonalAnime);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
