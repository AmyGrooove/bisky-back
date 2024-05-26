import { EListStatus } from "../../../auxiliary"

const createAnimeListStage = () => ({
  $addFields: {
    animeList: {
      generalCount: { $size: "$animeEstimates" },
      addedCount: {
        $sum: {
          $map: {
            input: "$animeEstimates",
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
            input: "$animeEstimates",
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
            input: "$animeEstimates",
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
            input: "$animeEstimates",
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

export { createAnimeListStage }
