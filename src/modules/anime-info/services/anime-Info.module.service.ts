import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeInfo } from "../schemas/anime-info.schema"
import { AnimeInfoModel } from "../entities/anime-info.entity"

@Injectable()
export class AnimeInfoService {
  constructor(
    @InjectModel("AnimeInfo")
    private readonly animeInfoModel: Model<AnimeInfo>,
  ) {}

  async getOneAnime(id: number) {
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
          $lookup: {
            from: "Genres",
            localField: "genres",
            foreignField: "link_id.anime",
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
        {
          $project: {
            _id: 1,
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
      ])
    )[0]

    response.franshise.animes = response.franshise.animes
      .filter((el) => el.id !== undefined)
      .sort((a, b) => a.id - b.id)

    response.genres.sort((a, b) => a.link_id.anime - b.link_id.anime)
    response.studios.sort((a, b) => a.id - b.id)

    return response
  }

  async getAnimePages(page: number, sort: "ongoing" | "best" | "last") {
    const matchValue =
      sort === "ongoing"
        ? [
            {
              $match: {
                status: "ongoing",
                "episodes.next_episode_at": { $ne: null },
                "dates.aired_on": {
                  $gte: new Date((new Date().getFullYear() - 1).toString()),
                },
              },
            },
          ]
        : []

    const response: AnimeInfoModel[] = await this.animeInfoModel.aggregate([
      ...matchValue,
      {
        $sort:
          sort === "best" || sort === "ongoing"
            ? { anotherScores: -1 }
            : { updateDate: -1 },
      },
      { $skip: 10 * (page - 1) },
      { $limit: 10 },
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
        $lookup: {
          from: "Genres",
          localField: "genres",
          foreignField: "link_id.anime",
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
      {
        $project: {
          _id: 1,
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
    ])

    response.forEach((el) => {
      if (el.franshise.animes.length === 0) {
        el.franshise = null
      } else {
        el.franshise.animes = el.franshise.animes
          .filter((el) => el.id !== undefined)
          .sort((a, b) => a.id - b.id)
      }

      el.genres.sort((a, b) => a.link_id.anime - b.link_id.anime)
      el.studios.sort((a, b) => a.id - b.id)
    })

    return response
  }
}
