import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AnimeList } from '../schems/AnimeList.schema';

@Injectable()
export class AnimePageService {
  constructor(
    @InjectModel(AnimeList.name)
    private animeList: Model<AnimeList>,
  ) {}

  async getAnimeInfo(shiki_id: number) {
    return this.animeList.findOne({ shiki_id: shiki_id }).lean().exec();
  }
}
