import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { shikimori_api, newTitlesUrl } from 'public/constatns';
import { http, shuffleArray } from 'public/functions';
import { HomeAnime, AnimeShort, AnimeFull, Screenshot } from 'public/types';
import {
  SeasonalAnime,
  SeasonalAnimeDocument,
} from 'src/schems/SeasonalAnime.schema';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(SeasonalAnime.name)
    private seasonalAnimeModel: Model<SeasonalAnimeDocument>,
  ) {}

  async getSeasonal(): Promise<SeasonalAnime[]> {
    return this.seasonalAnimeModel.find().exec();
  }

  async updateSeasonal(): Promise<boolean> {
    try {
      const newSeasonalAnime: HomeAnime[] = [];

      const animes = await http<AnimeShort[]>(
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
        shuffleArray(screenshots);
        screenshots.length = 6;

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

      await this.seasonalAnimeModel.remove();
      await this.seasonalAnimeModel.insertMany(newSeasonalAnime);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
