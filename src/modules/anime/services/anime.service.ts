import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Anime } from "../schemas/anime/anime.schema"
import { GeneralAnimeQuery } from "../queries/anime/generalAnime.query"
import { EStatus } from "../../../auxiliary"
import { EListStatus } from "../../../auxiliary/enums/listStatus.entity"
import {
  getSortQueryAggregate,
  getQueryAggregateObject,
} from "../../../functions"

@Injectable()
class AnimeService {
  constructor(
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
  ) {}

  async getAnimes(query: GeneralAnimeQuery) {
    const { page, count, limit, filter, sort } = query

    return this.animeModel
      .aggregate(
        [
          {
            $lookup: {
              from: "AnimeEstimate",
              localField: "_id",
              foreignField: "base",
              as: "scoresCollection",
            },
          },
          {
            $lookup: {
              from: "AnimeList",
              localField: "_id",
              foreignField: "base",
              as: "listsCollection",
            },
          },
          {
            $addFields: {
              usersList: {
                generalCount: { $size: "$listsCollection" },
                addedCount: {
                  $sum: {
                    $map: {
                      input: "$listsCollection",
                      as: "list",
                      in: {
                        $cond: [
                          { $eq: ["$$list.status", EListStatus.added] },
                          1,
                          0,
                        ],
                      },
                    },
                  },
                },
                watchingCount: {
                  $sum: {
                    $map: {
                      input: "$listsCollection",
                      as: "list",
                      in: {
                        $cond: [
                          { $eq: ["$$list.status", EListStatus.watching] },
                          1,
                          0,
                        ],
                      },
                    },
                  },
                },
                completedCount: {
                  $sum: {
                    $map: {
                      input: "$listsCollection",
                      as: "list",
                      in: {
                        $cond: [
                          { $eq: ["$$list.status", EListStatus.completed] },
                          1,
                          0,
                        ],
                      },
                    },
                  },
                },
                droppedCount: {
                  $sum: {
                    $map: {
                      input: "$listsCollection",
                      as: "list",
                      in: {
                        $cond: [
                          { $eq: ["$$list.status", EListStatus.dropped] },
                          1,
                          0,
                        ],
                      },
                    },
                  },
                },
              },
              score: {
                averageScore: {
                  $cond: {
                    if: { $gt: [{ $size: "$scoresCollection" }, 0] },
                    then: { $avg: "$scoresCollection.score" },
                    else: 0,
                  },
                },
                count: { $size: "$scoresCollection" },
              },
              episodes: {
                nextEpisodeAiredDate: {
                  $cond: {
                    if: { $eq: ["$status", EStatus.released] },
                    then: null,
                    else: { $last: "$episodes.singleEpisodes.airedAt" },
                  },
                },
                lastEpisodeAiredDate: {
                  $cond: {
                    if: { $eq: ["$status", EStatus.anons] },
                    then: null,
                    else: {
                      $cond: {
                        if: { $eq: ["$status", EStatus.released] },
                        then: { $last: "$episodes.singleEpisodes.airedAt" },
                        else: {
                          $arrayElemAt: [
                            "$episodes.singleEpisodes.airedAt",
                            -2,
                          ],
                        },
                      },
                    },
                  },
                },
                averageDuration: { $avg: "$episodes.singleEpisodes.duration" },
                airedCount: {
                  $cond: {
                    if: { $eq: ["$status", EStatus.anons] },
                    then: 0,
                    else: {
                      $subtract: [{ $size: "$episodes.singleEpisodes" }, 1],
                    },
                  },
                },
              },
              screenshots: {
                $slice: ["$screenshots", limit?.screenshotsCount ?? 100],
              },
              videos: { $slice: ["$videos", limit?.videosCount ?? 100] },
            },
          },
          { $project: { scoresCollection: 0, listsCollection: 0 } },
          ...getQueryAggregateObject(filter),
          ...getSortQueryAggregate(sort),
          { $skip: (page - 1) * count },
          { $limit: count },
        ],
        { allowDiskUse: true },
      )
      .exec()
  }
}

export { AnimeService }
