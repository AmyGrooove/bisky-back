import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeInfo } from "../schemas/anime-info.schema"
import { AnimeInfoModel } from "../entities/anime-info.entity"
import { animeAggregate, replaceText } from "../types/aggregate"
import { FilterArgs, SortArgs } from "../types/resolvers"

const getSeasonStartDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const seasonsStartDates = [
    new Date(year, 11, 1),
    new Date(year, 8, 1),
    new Date(year, 5, 1),
    new Date(year, 2, 1),
  ]

  const startDate = seasonsStartDates.find((el) => el < date)

  if (!startDate) {
    return "Invalid dateValue"
  }

  const formattedDate = `${startDate.getFullYear()}.${(startDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${startDate.getDate().toString().padStart(2, "0")}`

  return formattedDate
}

@Injectable()
export class AnimeInfoService {
  constructor(
    @InjectModel("AnimeInfo")
    private readonly animeInfoModel: Model<AnimeInfo>,
  ) {}

  async checkAnime(id: number) {
    return (await this.animeInfoModel.findOne({ id }).exec()) !== null
  }

  async getOneAnime(id: number) {
    const response: AnimeInfoModel = (
      await this.animeInfoModel.aggregate([
        { $match: { id: id } },
        ...animeAggregate,
      ])
    )[0]

    response.franchise.animes = response.franchise.animes
      .filter((el) => el.id !== undefined)
      .sort((a, b) => a.id - b.id)

    response.genres.sort((a, b) => a.linkId.anime - b.linkId.anime)
    response.studios.sort((a, b) => a.id - b.id)

    return response
  }

  async getAnimePages(
    page: number,
    count: number,
    filter?: FilterArgs,
    sort?: SortArgs,
    value?: string,
  ) {
    const matchValue = []
    const sortValue = []
    const makerSort = (value: boolean) => (value ? -1 : 1)

    for (const el in filter) {
      switch (el) {
        case "kind":
          matchValue.push({ $match: { kind: filter[el] } })
          break
        case "status":
          matchValue.push({ $match: { status: filter[el] } })
          break
        case "rating":
          matchValue.push({ $match: { rating: filter[el] } })
          break
        case "airedOn":
          matchValue.push(
            filter[el].to
              ? {
                  $match: {
                    "dates.airedOn": {
                      $gte: filter[el].from,
                      $lte: filter[el].to,
                    },
                  },
                }
              : { $match: { "dates.airedOn": { $gte: filter[el].from } } },
          )
          break
        case "genres":
          matchValue.push({ $match: { genres: filter[el] } })
          break
        case "studios":
          matchValue.push({ $match: { studios: filter[el] } })
          break
        case "franchiseName":
          matchValue.push({ $match: { "franchise.name": filter[el] } })
          break
        default:
          break
      }
    }

    for (const el in sort) {
      switch (el) {
        case "scores":
          sortValue.push({ $sort: { anotherScores: makerSort(sort[el]) } })
          break
        case "airedOn":
          sortValue.push({ $sort: { "dates.airedOn": makerSort(sort[el]) } })
          break
        case "updateDate":
          sortValue.push({ $sort: { updateDate: makerSort(sort[el]) } })
          break
        default:
          break
      }
    }

    const valueSearch = value
      ? [{ $match: { labels: { $regex: replaceText(value), $options: "i" } } }]
      : []

    const response: AnimeInfoModel[] = await this.animeInfoModel.aggregate([
      ...valueSearch,
      ...matchValue,
      ...sortValue,
      { $skip: count * (page - 1) },
      { $limit: count },
      ...animeAggregate,
    ])

    response.forEach((el) => {
      if (filter["screenshotsCount"] && el.screenshots.length !== 0)
        el.screenshots.length = filter["screenshotsCount"]

      if (el.franchise.animes.length === 0) {
        el.franchise = null
      } else {
        el.franchise.animes = el.franchise.animes
          .filter((el) => el.id !== undefined)
          .sort((a, b) => a.id - b.id)
      }

      el.genres.sort((a, b) => a.linkId.anime - b.linkId.anime)
      el.studios.sort((a, b) => a.id - b.id)
    })

    return response
  }
}
