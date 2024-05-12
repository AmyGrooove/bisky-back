import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Franchise } from "../schemas/franchise.schema"
import { getQueryObject } from "../../../functions"
import { GeneralFranchiseQuery } from "../queries/generalFranchise.query"

@Injectable()
class FranchiseService {
  constructor(
    @InjectModel("Franchise")
    private readonly franchiseModel: Model<Franchise>,
  ) {}

  async getFranchises(query: GeneralFranchiseQuery) {
    const { filter, page, count } = query

    return this.franchiseModel
      .find(getQueryObject(filter))
      .skip((page - 1) * count)
      .limit(count)
      .lean()
      .exec()
  }
}

export { FranchiseService }
