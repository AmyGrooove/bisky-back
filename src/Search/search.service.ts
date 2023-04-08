import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeInfo } from "../schems/AnimeInfo.schema"

const translate = (text: string) => {
  const convert = text.charCodeAt(0) >= 1040
  let newText = ""

  text.split("").forEach((str) => {
    newText += String.fromCharCode(
      convert ? str.charCodeAt(0) - 848 : str.charCodeAt(0) + 848,
    )
  })

  return newText
}

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(AnimeInfo.name)
    private animeInfo: Model<AnimeInfo>,
  ) {}

  async findTitle(value: string, page = 0) {
    const regex = new RegExp(value, "i")
    console.log(translate(value))

    return this.animeInfo
      .find({ labels: regex })
      .sort({ scores: -1 })
      .skip(page * 10)
      .limit(10)
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
}
