import { Types } from "mongoose"

import { LimitQuantityAnimeQuery } from "../queries/limitQuantityAnime.query"
import { UserFilterQuery } from "../queries/userFilter.query"
import { EListStatus } from "../../../auxiliary"

const createSearchMatch = (convertedSearchInput: RegExp[]) => [
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

const getInListAnimeMatch = (
  userFilters: UserFilterQuery | null,
  userId?: string,
) => {
  if (!userFilters?.isHiddenAnimeInUserList || !userId) return []

  return [
    {
      $match: {
        "estimatesCollection.author": { $ne: new Types.ObjectId(userId) },
      },
    },
  ]
}

const createAddFieldsStage = (limit?: LimitQuantityAnimeQuery) => ({
  $addFields: {
    scoredCollection: {
      $filter: {
        input: "$estimatesCollection",
        as: "estimate",
        cond: { $ne: ["$$estimate.score", null] },
      },
    },
    screenshots: { $slice: ["$screenshots", limit?.screenshotsCount ?? 100] },
    videos: { $slice: ["$videos", limit?.videosCount ?? 100] },
  },
})

const createUserDataStage = (userId?: string) => ({
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
                    $eq: ["$$estimate.author", new Types.ObjectId(userId)],
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
          watchedSeries: { $ifNull: ["$$matchingObj.watchedSeries", null] },
        },
      },
    },
  },
})

const createUsersListStage = () => ({
  $addFields: {
    usersList: {
      generalCount: { $size: "$estimatesCollection" },
      addedCount: {
        $sum: {
          $map: {
            input: "$estimatesCollection",
            as: "list",
            in: {
              $cond: [{ $eq: ["$$list.status", EListStatus.added] }, 1, 0],
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
              $cond: [{ $eq: ["$$list.status", EListStatus.watching] }, 1, 0],
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
              $cond: [{ $eq: ["$$list.status", EListStatus.completed] }, 1, 0],
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
              $cond: [{ $eq: ["$$list.status", EListStatus.dropped] }, 1, 0],
            },
          },
        },
      },
    },
  },
})

const createScoreStage = () => ({
  $addFields: {
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
  },
})

export {
  createSearchMatch,
  getInListAnimeMatch,
  createAddFieldsStage,
  createUserDataStage,
  createUsersListStage,
  createScoreStage,
}
