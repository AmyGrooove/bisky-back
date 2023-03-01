import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { AnimeList } from '../schems/AnimeList.schema';
import { searchTitleString } from '../../public/constatns';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(AnimeList.name)
    private animeList: Model<AnimeList>,
  ) {}

  async findTitle(value: string) {
    return this.animeList
      .find({
        all_labels: new RegExp(value, 'gi'),
      })
      .sort({ score: -1 })
      .select(searchTitleString)
      .limit(5)
      .exec();
  }
}
