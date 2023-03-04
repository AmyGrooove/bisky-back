import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeList } from '../schems/AnimeList.schema';
import {
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

  async getBest(page: number) {
    page = page || 1;
    const skip = (page - 1) * 12;

    const bestAnime = await this.animeList
      .find()
      .sort({ score: -1 })
      .select(posterTitleString)
      .skip(skip)
      .limit(12)
      .lean()
      .exec();

    return bestAnime;
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
