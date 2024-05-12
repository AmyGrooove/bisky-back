import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Fact } from "../schemas/fact.schema"
import { FilterFactQuery } from "../queries/filterFact.query"
import { getQueryObject } from "../../../functions"

@Injectable()
class FactService {
  constructor(
    @InjectModel("Fact")
    private readonly factModel: Model<Fact>,
  ) {}

  async getFacts(page: number, count: number, filter: FilterFactQuery | null) {
    return this.factModel
      .find(getQueryObject(filter))
      .skip((page - 1) * count)
      .limit(count)
      .lean()
      .exec()
  }

  async getOneRandomFact() {
    return this.factModel
      .findOne()
      .skip(Math.floor(Math.random() * (await this.factModel.countDocuments())))
      .select({ _id: 0 })
      .lean()
      .exec()
  }
}

export { FactService }
