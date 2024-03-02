import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { AnimeInfo } from "../schemas/animeInfo.schema"
import {
  LimitQuantityAnimeInfoQuery,
  FilterAnimeInfoQuery,
  SortAnimeInfoQuery,
} from "../resolvers/queries"

@Injectable()
class AnimeInfoService {
  constructor(
    @InjectModel("AnimeInfo")
    private readonly animeInfoModel: Model<AnimeInfo>,
  ) {}

  async getAnimesInfo(
    page: number,
    count: number,
    limitQuantityQuery: LimitQuantityAnimeInfoQuery | null,
    filterQuery: FilterAnimeInfoQuery | null,
    sortQuery: SortAnimeInfoQuery | null,
  ) {
    return this.animeInfoModel.aggregate([
      {
        $lookup: {
          from: "Genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $lookup: {
          from: "Studios",
          localField: "studios",
          foreignField: "_id",
          as: "studios",
        },
      },
      {
        $lookup: {
          from: "Franchises",
          localField: "franchises",
          foreignField: "_id",
          as: "franchises",
        },
      },
      { $skip: count * (page - 1) },
      { $limit: count },
    ])
  }

  async getOneAnimeInfo(
    value: string,
    limitQuantityQuery: LimitQuantityAnimeInfoQuery | null,
  ) {
    return
  }
}

export { AnimeInfoService }
