import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { shikimori_api } from '../../public//constatns';
import { http } from '../../public//functions';
import {
  AnimeShort,
  AnimeFull,
  Screenshot,
  Genres,
  ShortStudio,
  Relation,
  RelationAnimes,
} from '../../public/types';
import { AnimeList, AnimeListDocument } from '../schems/AnimeList.schema';
import { UpdateAnimesDto } from '../dto/updateAnimes.dto';

@Injectable()
export class ShikiService {
  constructor(
    @InjectModel(AnimeList.name)
    private seasonalAnimeModel: Model<AnimeListDocument>,
  ) {}

  async updateOngoingAnons(): Promise<boolean | HttpException> {
    try {
      const shikiAnimes: number[] = (
        await this.seasonalAnimeModel
          .find({
            $or: [{ status: 'anons' }, { status: 'ongoing' }],
          })
          .exec()
      ).map((item) => item.shiki_id);

      const newAnimes = await this.parseAnime(shikiAnimes);

      await this.seasonalAnimeModel.deleteMany({
        $or: [{ status: 'anons' }, { status: 'ongoing' }],
      });

      await this.seasonalAnimeModel.insertMany(newAnimes);

      return true;
    } catch (error) {
      return new HttpException('error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async updateAnimes(
    updateAnimesDto: UpdateAnimesDto,
  ): Promise<number | HttpException> {
    try {
      let newAnimes: AnimeList[] = [];
      let shikiAnimes: number[] = [];

      let page = 1;
      while (true) {
        try {
          const newPage = (
            await http<AnimeShort[]>(
              shikimori_api +
                'animes?limit=50' +
                '&season=' +
                updateAnimesDto.from +
                '_' +
                updateAnimesDto.to +
                '&page=' +
                page,
            )
          ).map((item) => item.id);

          shikiAnimes = shikiAnimes.concat(newPage);

          if (newPage.length === 0) {
            break;
          }

          console.log('page: ' + page);
          page++;

          await new Promise((res) => setTimeout(res, 1000));
        } catch (error) {
          console.log('delay... ' + error.message);

          await new Promise((res) => setTimeout(res, 5000));
        }
      }

      console.log('pages full');
      newAnimes = newAnimes.concat(await this.parseAnime(shikiAnimes));

      await this.seasonalAnimeModel.deleteMany({
        $where: `new Date(this.aired_on) >= new Date("${
          updateAnimesDto.from
        }") && new Date(this.aired_on) <= new Date("${
          updateAnimesDto.to + 1
        }")`,
      });

      await this.seasonalAnimeModel.insertMany(newAnimes);

      console.log('end');
      return shikiAnimes.length;
    } catch (error) {
      return new HttpException('error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  private async parseAnime(shikiAnimes: number[], count = 0) {
    const successParse: AnimeList[] = [];
    const failParse: number[] = [];

    for (const animeId of shikiAnimes) {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        const genres: Genres[] = [];
        const studios: ShortStudio[] = [];
        const newRelations: Relation[] = [];

        const singlePage = await http<AnimeFull>(
          shikimori_api + 'animes/' + animeId,
        );

        const screenshots = (
          await http<Screenshot[]>(
            shikimori_api + 'animes/' + singlePage.id + '/screenshots',
          )
        ).map((item) => item.original.slice(0, -15).substring(29));

        const relations = (
          await http<RelationAnimes[]>(
            shikimori_api + 'animes/' + singlePage.id + '/related',
          )
        ).filter((el) => el.manga === null);

        singlePage.genres.forEach((el) => {
          genres.push({
            genre_id: el.id,
            name: {
              en: el.name,
              ru: el.russian,
            },
          });
        });

        singlePage.studios.forEach((el) => {
          studios.push({
            studio_id: el.id,
            name: el.name,
            image:
              el.image !== null ? el.image.slice(0, -15).substring(25) : null,
          });
        });

        relations.forEach((el) => {
          newRelations.push({
            shiki_id: el.anime.id,
            relation: {
              en: el.relation,
              ru: el.relation_russian,
            },
            label: {
              en: el.anime.name,
              ru: el.anime.russian,
            },
            image:
              el.anime.image.original.indexOf('missing_o') === -1
                ? el.anime.image.original.slice(0, -15).substring(24)
                : null,
          });
        });

        successParse.push({
          shiki_id: singlePage.id,
          label: {
            en: singlePage.name,
            ru: singlePage.russian,
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
            singlePage.image.original.indexOf('missing_o') === -1
              ? singlePage.image.original.slice(0, -15).substring(24)
              : null,
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
              ? singlePage.description
                  .replace(/(\[([^\]]+)\])/gi, '')
                  .replace('] ', '')
                  .replace(']', '')
              : null,
          franchise: singlePage.franchise,
          next_episode_at: singlePage.next_episode_at,
          genres: genres.sort(),
          studios: studios.sort(),
          videos: singlePage.videos.map((item) => item.player_url),
          screenshots: screenshots,
          relations: newRelations.sort(),
        });

        console.log(
          count !== undefined ? ++count + '/' + shikiAnimes.length : 'parsed',
        );
      } catch (error) {
        console.log('delay... ' + error.message);
        failParse.push(animeId);

        await new Promise((res) => setTimeout(res, 5000));
      }
    }

    if (failParse.length !== 0) {
      return successParse.concat(await this.parseAnime(failParse, count));
    } else {
      return successParse;
    }
  }
}