export const animeAggregate = [
  {
    $lookup: {
      from: "AnimeInfo",
      localField: "franchise.animes.id",
      foreignField: "id",
      as: "relationsAnime",
    },
  },
  {
    $addFields: {
      "franchise.animes": {
        $map: {
          input: "$franchise.animes",
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
      foreignField: "linkId.anime",
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
      franchise: {
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
]
