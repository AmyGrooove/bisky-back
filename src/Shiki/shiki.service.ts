import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { shikimori_api } from '@public/constatns';
import { http } from '@public/functions';
import { AnimeShort, AnimeFull, Screenshot } from '@public/types';

import { AnimeList, AnimeListDocument } from '@/schems/AnimeList.schema';
import { UpdateAnimesDto } from '@/dto/updateAnimes.dto';

@Injectable()
export class ShikiService {
  constructor(
    @InjectModel(AnimeList.name)
    private seasonalAnimeModel: Model<AnimeListDocument>,
  ) {}

  async updateAnimes(
    updateAnimesDto: UpdateAnimesDto,
  ): Promise<number | HttpException> {
    try {
      let newAnimes: AnimeList[] = [];

      let shikiAnimes: AnimeShort[] = [];
      let page = 0;

      while (true) {
        shikiAnimes = await http<AnimeShort[]>(
          shikimori_api +
            'animes?limit=50&page=' +
            page +
            '&season=' +
            updateAnimesDto.from +
            '_' +
            updateAnimesDto.to,
        );

        if (shikiAnimes.length === 0) {
          break;
        }

        newAnimes = newAnimes.concat(await this.getAnimeInfo(shikiAnimes));
        page++;
      }

      await this.seasonalAnimeModel.deleteMany({
        $where: `new Date(this.aired_on) >= new Date("${
          updateAnimesDto.from
        }") && new Date(this.aired_on) <= new Date("${
          updateAnimesDto.to + 1
        }")`,
      });

      await this.seasonalAnimeModel.insertMany(newAnimes);

      return page;
    } catch (error) {
      return new HttpException('error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  private async getAnimeInfo(shikiAnimes: AnimeShort[]) {
    const successParse: AnimeList[] = [];
    const failParse: AnimeShort[] = [];

    for (const anime of shikiAnimes) {
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const singlePage = await http<AnimeFull>(
          shikimori_api + 'animes/' + anime.id,
        );

        if (singlePage.kind === 'music') break;

        const screenshots = (
          await http<Screenshot[]>(
            shikimori_api + 'animes/' + singlePage.id + '/screenshots',
          )
        ).map((item) => 'https://shikimori.one' + item.original.slice(0, -11));

        successParse.push({
          shiki_id: singlePage.id,
          label: {
            ru: singlePage.russian,
            en: singlePage.name,
          },
          all_labels: [
            singlePage.russian,
            singlePage.name,
            ...singlePage.english,
            ...singlePage.japanese,
            ...singlePage.synonyms,
          ]
            .filter((item) => item !== null)
            .sort(),
          image:
            'https://shikimori.one' + singlePage.image.original.slice(0, -11),
          url: singlePage.url.substring(7),
          kind: singlePage.kind.toLocaleLowerCase(),
          score: Number(singlePage.score),
          status: singlePage.status.toLocaleLowerCase(),
          episodes: singlePage.episodes,
          episodes_aired: singlePage.episodes_aired,
          aired_on: singlePage.aired_on,
          released_on: singlePage.released_on,
          rating: singlePage.rating.toLocaleLowerCase(),
          duration: Number(singlePage.duration),
          description:
            singlePage.description !== null
              ? singlePage.description.replace(/(\[([^\]]+)\])/gi, '')
              : null,
          franchise: singlePage.franchise,
          next_episode_at: singlePage.next_episode_at,
          genres: singlePage.genres.map((item) => item.id).sort(),
          studios_id: singlePage.studios.map((item) => item.id),
          videos: singlePage.videos.map((item) => item.player_url),
          screenshots: screenshots,
        });
      } catch (error) {
        console.log(error);
        failParse.push(anime);

        await new Promise((res) => setTimeout(res, 5000));
      }
    }

    if (failParse.length !== 0) {
      return successParse.concat(await this.getAnimeInfo(failParse));
    } else {
      return successParse;
    }
  }
}
