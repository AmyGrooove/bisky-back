import { Model, Types } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { GeneralAnimeQuery } from "../queries/generalAnime.query"
import { EListStatus, EStatus } from "../../../auxiliary"
import {
  getSortQueryAggregate,
  getQueryAggregateObject,
  convertIncorrectKeyboard,
} from "../../../functions"
import { Anime } from "../schemas/anime.schema"
import { User } from "../../user/schemas/user.schema"

@Injectable()
class AnimeService {
  constructor(
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
    @InjectModel("User")
    private readonly userModel: Model<User>,
  ) {}

  async getAnimes({
    query,
    userId,
  }: {
    query: GeneralAnimeQuery
    userId?: string
  }) {
    const {
      page,
      count,
      limit,
      filter,
      sort,
      searchInput,
      isPaginationOff,
      userFilters,
    } = query

    const convertedSearchInput = searchInput
      ? convertIncorrectKeyboard(searchInput)
      : null

    const searchMatch = convertedSearchInput
      ? [
          {
            $match: {
              $or: [
                { "labels.en": { $in: convertedSearchInput } },
                { "labels.ru": { $in: convertedSearchInput } },
                { "labels.synonymous": { $in: convertedSearchInput } },
              ],
            },
          },
        ]
      : []

    const skippedAnime =
      !userFilters?.isHiddenAnimeInSkipList || !userId
        ? []
        : [
            {
              $match: {
                _id: {
                  $nin: (
                    await this.userModel.findById(userId).lean().exec()
                  ).skippedAnime.map(
                    (item) => new Types.ObjectId(item.animeId.toString()),
                  ),
                },
              },
            },
          ]

    const inListAnime =
      !userFilters?.isHiddenAnimeInUserList || !userId
        ? []
        : [
            {
              $match: {
                "estimatesCollection.author": {
                  $ne: new Types.ObjectId(userId),
                },
              },
            },
          ]

    return this.animeModel
      .aggregate(
        [
          ...skippedAnime,
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
          ...inListAnime,
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
                                new Types.ObjectId(userId),
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
                count: { $subtract: ["$episodes.count", 1] },
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
                averageDuration: {
                  $ceil: { $avg: "$episodes.singleEpisodes.duration" },
                },
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
          ...searchMatch,
          ...getSortQueryAggregate(sort, isPaginationOff),
          { $skip: (page - 1) * count },
          { $limit: count },
        ],
        { allowDiskUse: true },
      )
      .exec()
  }

  async getAllAnimeIds() {
    return (await this.animeModel.find().select("_id").lean().exec()).map(
      (item) => item._id,
    )
  }
}

export { AnimeService }
