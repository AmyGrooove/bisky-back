import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeInfo } from "./schema/anime-info.schema"
import { AnimeInfoModel } from "./entities/anime-info.entity"

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
    const response: AnimeInfoModel = (
      await this.animeInfoModel.aggregate([
        { $match: { id: id } },
        {
          $lookup: {
            from: "AnimeInfo",
            localField: "franshise.animes.id",
            foreignField: "id",
            as: "relationsAnime",
          },
        },
        {
          $addFields: {
            "franshise.animes": {
              $map: {
                input: "$franshise.animes",
                as: "anime",
                in: {
                  $mergeObjects: [
                    { relation: "$$anime.relation" },
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$relationsAnime",
                            as: "relAnime",
                            cond: {
                              $eq: ["$$relAnime.id", "$$anime.id"],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            id: 1,
            labels: 1,
            poster: 1,
            kind: 1,
            scores: 1,
            anotherScores: 1,
            status: 1,
            episodes: 1,
            dates: 1,
            rating: 1,
            description: 1,
            screenshots: 1,
            videos: 1,
            genres: 1,
            studios: 1,
            franshise: {
              name: 1,
              animes: {
                relation: 1,
                id: 1,
                labels: 1,
                poster: 1,
                kind: 1,
                scores: 1,
                anotherScores: 1,
                status: 1,
              },
            },
            updateDate: 1,
          },
        },
        {
          $lookup: {
            from: "Genres",
            localField: "genres",
            foreignField: "id",
            as: "genres",
          },
        },
        {
          $lookup: {
            from: "Studios",
            localField: "studios",
            foreignField: "id",
            as: "studios",
          },
        },
      ])
    )[0]

    response.franshise.animes = response.franshise.animes.filter(
      (el) => el.id !== undefined,
    )

    response.genres.sort((a, b) => a.id - b.id)
    response.studios.sort((a, b) => a.id - b.id)
    response.franshise.animes.sort((a, b) => a.id - b.id)

    return response
  }
}
