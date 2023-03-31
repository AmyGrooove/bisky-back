import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { getUsedAnimeString } from "../../public/functions"
import { AnimeInfo } from "../schems/AnimeInfo.schema"
import { posterTitleObj } from "../../public/constants"
import { Facts } from "../schems/Facts.schema"
import { Genres } from "../schems/Genres.schema"

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(AnimeInfo.name)
    private animeList: Model<AnimeInfo>,

    @InjectModel(Genres.name)
    private genres: Model<Genres>,

    @InjectModel(Facts.name)
    private facts: Model<Facts>,
  ) {}

  async getSeasonal() {
    const lastYearStart = new Date()
    lastYearStart.setFullYear(lastYearStart.getFullYear() - 1, 0, 1)

    return this.animeList.aggregate([
      {
        $match: {
          status: "ongoing",
          "episodes.next_episode_at": { $ne: null },
          "dates.aired_on": {
            $gte: new Date((new Date().getFullYear() - 1).toString()),
          },
        },
      },
      {
        $lookup: {
          from: "Genres",
          localField: "genres",
          foreignField: "genre_id",
          as: "genres",
        },
      },
      {
        $project: {
          _id: 0,
          shiki_id: 1,
          labels: { $slice: ["$labels", 2] },
          poster: 1,
          scores: 1,
          genres: {
            genre_id: 1,
            name: 1,
          },
          screenshots: { $slice: ["$screenshots", 6] },
        },
      },
      { $sort: { scores: -1 } },
      { $limit: 10 },
    ])
  }

  async getBest(page: number, usedAnimes: string | undefined) {
    const pageSize = 12
    page = page || 1
    const skip = (page - 1) * pageSize

    return this.animeList
      .find({ shiki_id: { $nin: getUsedAnimeString(usedAnimes) } })
      .select(posterTitleObj)
      .sort({ scores: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec()
      .then((results) => {
        return results.map((result) => ({
          ...result,
          aired_on: result.dates.aired_on,
          dates: undefined,
        }))
      })
  }

  async getGenresAnime(
    genre: number,
    page: number,
    usedAnimes: string | undefined,
  ) {
    const pageSize = 6
    page = page || 1
    const skip = (page - 1) * pageSize

    return this.animeList
      .find({
        genres: genre,
        shiki_id: { $nin: getUsedAnimeString(usedAnimes) },
        scores: { $gte: 6 },
        $expr: {
          $gte: [{ $toDate: "$dates.aired_on" }, new Date("1990")],
        },
      })
      .select(posterTitleObj)
      .sort({ scores: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec()
      .then((results) => {
        return results.map((result) => ({
          ...result,
          aired_on: result.dates.aired_on,
          dates: undefined,
        }))
      })
  }

  async getAllGenres() {
    return this.genres
      .find({
        type: "anime",
        "name.ru": { $nin: ["Эротика", "Магия", "Хентай", "Яой", "Юри"] },
      })
      .select({
        _id: 0,
        genre_id: 1,
        name: 1,
      })
      .lean()
      .exec()
  }

  async getFact() {
    const count = await this.facts.countDocuments()
    const randomIndex = Math.floor(Math.random() * count)
    const randomFact = await this.facts.findOne().skip(randomIndex).exec()

    return randomFact.fact
  }

  async addFact(newFact: string) {
    this.facts.insertMany(newFact)
    return true
  }
}
