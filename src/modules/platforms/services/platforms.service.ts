import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Platforms } from "../schemas/platforms.schema"
import { getQueryObject } from "src/functions"
import { SpecificPlatformsQuery } from "../resolvers/queries"

@Injectable()
class PlatformsService {
  constructor(
    @InjectModel("Platforms")
    private readonly platformModel: Model<Platforms>,
  ) {}

  async getPlatforms(
    page: number,
    count: number,
    specificValues: SpecificPlatformsQuery | null,
  ) {
    return this.platformModel
      .find(getQueryObject(specificValues))
      .skip(count * (page - 1))
      .limit(count)
      .lean()
      .exec()
  }
}

export { PlatformsService }
