import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeInfo } from '../schems/AnimeInfo.schema';

@Injectable()
export class AnimePageService {
  constructor(
    @InjectModel(AnimeInfo.name)
    private animeInfo: Model<AnimeInfo>,
  ) {}

  async getAnimeInfo(shiki_id: number) {
    return this.animeInfo
      .aggregate([
        { $match: { shiki_id: shiki_id } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'AnimeInfo',
            localField: 'relations.animes.link_id',
            foreignField: 'shiki_id',
            as: 'relationsAnime',
          },
        },
        {
          $lookup: {
            from: 'Genres',
            localField: 'genres',
            foreignField: 'genre_id',
            as: 'genres',
          },
        },
        {
          $lookup: {
            from: 'Studios',
            localField: 'studios',
            foreignField: 'studio_id',
            as: 'studios',
          },
        },
        {
          $addFields: {
            'relations.animes': {
              $map: {
                input: '$relations.animes',
                as: 'anime',
                in: {
                  relation: '$$anime.relation',
                  link: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$relationsAnime',
                          as: 'relAnime',
                          cond: {
                            $eq: ['$$relAnime.shiki_id', '$$anime.link_id'],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            shiki_id: 1,
            dates: 1,
            description: 1,
            episodes: 1,
            kind: 1,
            labels: 1,
            poster: 1,
            rating: 1,
            scores: 1,
            screenshots: 1,
            status: 1,
            videos: 1,
            relations: {
              franchise: 1,
              animes: {
                relation: 1,
                link: {
                  shiki_id: 1,
                  labels: 1,
                  poster: 1,
                  scores: 1,
                  kind: 1,
                  status: 1,
                  dates: 1,
                },
              },
            },
            genres: {
              $map: {
                input: '$genres',
                as: 'genre',
                in: { genre_id: '$$genre.genre_id', name: '$$genre.name' },
              },
            },
            studios: {
              $map: {
                input: '$studios',
                as: 'studio',
                in: {
                  studio_id: '$$studio.studio_id',
                  name: '$$studio.name',
                  img: '$$studio.img',
                },
              },
            },
          },
        },
      ])
      .then((results) => {
        if (results.length === 0) throw 'err';

        return {
          ...results[0],
          relations: {
            franchise: results[0].relations.franchise,
            animes: results[0].relations.animes.filter(
              (el) => el.link !== undefined,
            ),
          },
          description: results[0].description
            ? results[0].description.replace(/\r\n/g, '<br>')
            : null,
        };
      })
      .catch((error) => {
        return new NotFoundException('Anime not found');
      });
  }
}
