import { Model, ObjectId, Types } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { GeneralAnimeQuery } from "../queries/anime/generalAnime.query"
import { EListStatus, EStatus } from "../../../auxiliary"
import {
  getSortQueryAggregate,
  getQueryAggregateObject,
} from "../../../functions"
import { Anime } from "../schemas/anime.schema"

@Injectable()
class AnimeService {
  constructor(
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
  ) {}

  async getAnimes(query: GeneralAnimeQuery, userId?: ObjectId) {
    const { page, count, limit, filter, sort } = query

    return this.animeModel
      .aggregate(
        [
          {
            $lookup: {
              from: "AnimeEstimate",
              localField: "_id",
              foreignField: "base",
              as: "estimatesCollection",
            },
          },
          {
            $addFields: {
              scoredCollection: {
                $filter: {
                  input: "$estimatesCollection",
                  as: "estimate",
                  cond: { $ne: ["$$estimate.score", null] },
                },
              },
            },
          },
          {
            $addFields: {
              userData: {
                $let: {
                  vars: {
                    matchingObj: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$estimatesCollection",
                            as: "estimate",
                            cond: {
                              $eq: [
                                "$$estimate.author",
                                new Types.ObjectId(userId as unknown as string),
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    animeStatus: { $ifNull: ["$$matchingObj.status", null] },
                    score: { $ifNull: ["$$matchingObj.score", null] },
                    watchedSeries: {
                      $ifNull: ["$$matchingObj.watchedSeries", null],
                    },
                  },
                },
              },
              usersList: {
                generalCount: { $size: "$estimatesCollection" },
                addedCount: {
                  $sum: {
                    $map: {
                      input: "$estimatesCollection",
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
                      input: "$estimatesCollection",
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
                      input: "$estimatesCollection",
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
                      input: "$estimatesCollection",
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
                count: { $size: "$scoredCollection" },
                averageScore: {
                  $cond: {
                    if: { $eq: [{ $size: "$scoredCollection" }, 0] },
                    then: 0,
                    else: { $avg: "$scoredCollection.score" },
                  },
                },
              },
              episodes: {
                nextEpisodeAiredDate: {
                  $cond: {
                    if: { $eq: ["$status", EStatus.released] },
                    then: null,
                    else: { $last: "$episodes.singleEpisodes.airedOn" },
                  },
                },
                lastEpisodeAiredDate: {
                  $cond: {
                    if: { $eq: ["$status", EStatus.anons] },
                    then: null,
                    else: {
                      $cond: {
                        if: { $eq: ["$status", EStatus.released] },
                        then: { $last: "$episodes.singleEpisodes.airedOn" },
                        else: {
                          $arrayElemAt: [
                            "$episodes.singleEpisodes.airedOn",
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
          { $project: { estimatesCollection: 0, scoredCollection: 0 } },
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
