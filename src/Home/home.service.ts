import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeList } from '../schems/AnimeList.schema';
import {
  posterTitleObj,
  posterTitleString,
  seasonalTitlesString,
} from '../../public/constatns';
import { Facts } from '../schems/Facts.schema';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(AnimeList.name)
    private animeList: Model<AnimeList>,

    @InjectModel(Facts.name)
    private facts: Model<Facts>,
  ) {}

  async getSeasonal() {
    const seasonalAnime = await this.animeList
      .find({
        status: 'ongoing',
        aired_on: { $gte: new Date().getFullYear() - 1 },
      })
      .sort({ score: -1 })
      .select(seasonalTitlesString)
      .limit(10)
      .lean()
      .exec();

    seasonalAnime.forEach((el) => {
      el.screenshots = el.screenshots.slice(0, 6);
    });

    return seasonalAnime;
  }

  async getBest(page: number, usedAnimes: string | undefined) {
    const pageSize = 12;

    page = page || 1;
    const skip = (page - 1) * pageSize;

    usedAnimes =
      usedAnimes !== undefined
        ? JSON.parse(
            usedAnimes.includes('[') && usedAnimes.endsWith(']')
              ? usedAnimes
              : `[${usedAnimes}]`,
          )
        : [];

    return this.animeList
      .find({ shiki_id: { $nin: usedAnimes } }, posterTitleString)
      .sort({ score: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();
  }

  async getGenresAnime(
    genre: string,
    page: number,
    usedAnimes: string | undefined,
  ) {
    const pageSize = 6;

    page = page || 1;
    const skip = (page - 1) * pageSize;

    usedAnimes =
      usedAnimes !== undefined
        ? JSON.parse(
            usedAnimes.includes('[') && usedAnimes.endsWith(']')
              ? usedAnimes
              : `[${usedAnimes}]`,
          )
        : [];

    return this.animeList
      .find(
        {
          'genres.name.en': genre,
          shiki_id: { $nin: usedAnimes },
          status: { $nin: ['anons'] },
          kind: { $nin: ['ova', 'special'] },
          score: { $gte: 6 },
          $expr: {
            $gte: [{ $toDate: '$aired_on' }, new Date('1990')],
          },
        },
        posterTitleString,
      )
      .sort({ score: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();
  }

  async getAllGenres() {
    return this.animeList.distinct('genres.name').lean().exec();
  }

  async getFact() {
    const count = await this.facts.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomFact = await this.facts.findOne().skip(randomIndex).exec();

    return randomFact;
  }

  async addFact(newFact: string) {
    this.facts.insertMany(newFact);
    return true;
  }
}
