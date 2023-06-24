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

export const replaceText = (text) => {
  const layout = {
    q: "й",
    w: "ц",
    e: "у",
    r: "к",
    t: "е",
    y: "н",
    u: "г",
    i: "ш",
    o: "щ",
    p: "з",
    "[": "х",
    "]": "ъ",
    a: "ф",
    s: "ы",
    d: "в",
    f: "а",
    g: "п",
    h: "р",
    j: "о",
    k: "л",
    l: "д",
    ";": "ж",
    "'": "э",
    z: "я",
    x: "ч",
    c: "с",
    v: "м",
    b: "и",
    n: "т",
    m: "ь",
    ",": "б",
    ".": "ю",
    "/": ".",
  }

  const reversedLayout = {}
  for (const key in layout) {
    const value = layout[key]
    reversedLayout[value] = key
  }

  const transformedText = text
    .split("")
    .map((letter) => layout[letter] || reversedLayout[letter] || letter)
    .join("")

  return `${text}|${transformedText}`
}
