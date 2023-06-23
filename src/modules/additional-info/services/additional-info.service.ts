import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Genres } from "../schemas/genres.schema"
import { Facts } from "../schemas/facts.schema"

@Injectable()
export class AdditionalInfoService {
  constructor(
    @InjectModel("Genres")
    private readonly genresModel: Model<Genres>,
    @InjectModel("Facts")
    private readonly factsModel: Model<Facts>,
  ) {}

  async getGenres() {
    return this.genresModel.find().select({ _id: 0 }).lean().exec()
  }

  async getRandomFact() {
    const count = await this.factsModel.countDocuments()
    const randomIndex = Math.floor(Math.random() * count)
    const randomFact = await this.factsModel
      .findOne()
      .skip(randomIndex)
      .lean()
      .exec()

    return randomFact.fact
  }
}
