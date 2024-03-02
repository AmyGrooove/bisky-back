import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Franchises } from "../schemas/franchises.schema"
import { SpecificFranchisesQuery } from "../resolvers/queries"
import { getQueryObject } from "../../../functions"

@Injectable()
class FranchisesService {
  constructor(
    @InjectModel("Franchises")
    private readonly franchisesModel: Model<Franchises>,
  ) {}

  async getFranchises(
    page: number,
    count: number,
    specificValues: SpecificFranchisesQuery | null,
  ) {
    return this.franchisesModel
      .find(getQueryObject(specificValues))
      .skip(count * (page - 1))
      .limit(count)
      .lean()
      .exec()
  }
}

export { FranchisesService }
