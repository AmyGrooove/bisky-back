import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { getUsedAnimeString } from "../../public/functions"
import { AnimeInfo } from "../schems/AnimeInfo.schema"
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

  async getSeasonal(page = 0, usedAnimes?: string) {
    const lastYearStart = new Date()
    lastYearStart.setFullYear(lastYearStart.getFullYear() - 1, 0, 1)

    return this.animeList.aggregate([
      {
        $match: {
          status: "ongoing",
          $expr: { $gt: [{ $size: "$screenshots" }, 0] },
          "episodes.next_episode_at": { $ne: null },
          "dates.aired_on": {
            $gte: new Date((new Date().getFullYear() - 1).toString()),
          },
          shiki_id: { $nin: getUsedAnimeString(usedAnimes) },
        },
      },
      { $sort: { scores: -1 } },
      { $skip: page * 12 },
      { $limit: 12 },
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
          kind: 1,
          scores: 1,
          episodes: 1,
          dates: 1,
          rating: 1,
          genres: {
            genre_id: 1,
            name: 1,
          },
          screenshots: { $slice: ["$screenshots", 6] },
        },
      },
    ])
  }

  async getBest(page = 0, usedAnimes?: string) {
    return this.animeList
      .find({ shiki_id: { $nin: getUsedAnimeString(usedAnimes) } })
      .sort({ scores: -1 })
      .skip(page * 12)
      .limit(12)
      .select({
        _id: 0,
        shiki_id: 1,
        labels: { $slice: ["$labels", 2] },
        poster: 1,
        kind: 1,
        scores: 1,
        status: 1,
        episodes: 1,
        dates: 1,
        rating: 1,
      })
      .lean()
      .exec()
  }

  async getGenresAnime(genre: number, page = 0, usedAnimes?: string) {
    return this.animeList
      .find({
        genres: genre,
        shiki_id: { $nin: getUsedAnimeString(usedAnimes) },
      })
      .sort({ scores: -1 })
      .skip(page * 12)
      .limit(12)
      .select({
        _id: 0,
        shiki_id: 1,
        labels: { $slice: ["$labels", 2] },
        poster: 1,
        kind: 1,
        scores: 1,
        status: 1,
        episodes: 1,
        dates: 1,
        rating: 1,
      })
      .lean()
      .exec()
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

  async getLastAnimes(page = 0, usedAnimes?: string) {
    return this.animeList
      .find({
        status: "ongoing",
        shiki_id: { $nin: getUsedAnimeString(usedAnimes) },
      })
      .sort({ updateDate: -1 })
      .skip(page * 12)
      .limit(12)
      .select({
        _id: 0,
        shiki_id: 1,
        labels: { $slice: ["$labels", 2] },
        poster: 1,
        kind: 1,
        scores: 1,
        episodes: 1,
        dates: 1,
        rating: 1,
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
