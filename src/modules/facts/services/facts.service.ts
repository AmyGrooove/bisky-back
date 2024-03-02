import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { SpecificFactsQuery } from "../resolvers/queries"
import { getQueryObject } from "../../../functions"
import { Facts } from "../schemas/facts.schema"

@Injectable()
class FactsService {
  constructor(
    @InjectModel("Facts")
    private readonly factsModel: Model<Facts>,
  ) {}

  async getFacts(count: number, specificValues: SpecificFactsQuery | null) {
    return this.factsModel
      .find(getQueryObject(specificValues))
      .limit(count)
      .lean()
      .exec()
  }

  async getOneRandomFact() {
    return this.factsModel
      .findOne()
      .skip(
        Math.floor(Math.random() * (await this.factsModel.countDocuments())),
      )
      .lean()
      .exec()
  }
}

export { FactsService }
