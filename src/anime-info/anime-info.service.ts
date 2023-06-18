import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeInfo } from "./schema/anime-info.schema"

@Injectable()
export class AnimeInfoService {
  constructor(
    @InjectModel("AnimeInfo")
    private readonly animeInfoModel: Model<AnimeInfo>,
  ) {}

  async getAll() {
    return await this.animeInfoModel.find().exec()
  }

  async getOneAnime(id?: number) {
    console.log(
      await this.animeInfoModel.findOne({ id }).populate("genres").lean(),
    )

    return await this.animeInfoModel.findOne({ id }).lean().exec()
  }
}
