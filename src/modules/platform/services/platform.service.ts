import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Platform } from "../schemas/platform.schema"
import { getQueryObject } from "../../../functions"
import { GeneralPlatformQuery } from "../queries/generalPlatform.query"

@Injectable()
class PlatformService {
  constructor(
    @InjectModel("Platform")
    private readonly platformModel: Model<Platform>,
  ) {}

  async getPlatforms(query: GeneralPlatformQuery) {
    const { filter, page, count } = query

    return this.platformModel
      .find(getQueryObject(filter))
      .skip((page - 1) * count)
      .limit(count)
      .lean()
      .exec()
  }
}

export { PlatformService }
