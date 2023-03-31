import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeInfo } from "../schems/AnimeInfo.schema"
import { posterTitleObj } from "../../public/constants"

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(AnimeInfo.name)
    private animeInfo: Model<AnimeInfo>,
  ) {}

  async findTitle(value: string) {
    return this.animeInfo
      .find({
        labels: new RegExp(value, "gi"),
      })
      .sort({ scores: -1 })
      .select(posterTitleObj)
      .limit(5)
      .exec()
  }
}
