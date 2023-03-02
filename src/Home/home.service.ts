import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeList } from '../schems/AnimeList.schema';
import {
  posterTitleString,
  seasonalTitlesString,
} from '../../public/constatns';
import { shuffleArray } from '../../public/functions';
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
      .exec();

    seasonalAnime.forEach((el) => {
      el.screenshots.length = 5;
    });

    return seasonalAnime;
  }

  async getBest(page: number) {
    page = page === undefined ? 1 : page;

    return this.animeList
      .find()
      .sort({ score: -1 })
      .select(posterTitleString)
      .skip((page - 1) * 12)
      .limit(12)
      .exec();
  }

  async getFact() {
    const facts = await this.facts.find().exec();

    return shuffleArray(facts)[0];
  }

  async addFact(newFact: string) {
    this.facts.insertMany(newFact);
    return true;
  }
}
