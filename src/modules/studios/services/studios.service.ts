import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Studios } from "../schemas/studios.schema"
import { getQueryObject } from "../../../functions"
import { SpecificStudiosQuery } from "../resolvers/queries"

@Injectable()
class StudiosService {
  constructor(
    @InjectModel("Studios")
    private readonly studioModel: Model<Studios>,
  ) {}

  async getStudios(
    page: number,
    count: number,
    specificValues: SpecificStudiosQuery | null,
  ) {
    return this.studioModel
      .find(getQueryObject(specificValues))
      .skip(count * (page - 1))
      .limit(count)
      .lean()
      .exec()
  }
}

export { StudiosService }
