import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Studio } from "../schemas/studio.schema"
import { GeneralStudioQuery } from "../queries/generalStudio.query"
import { getQueryObject } from "../../../functions"

@Injectable()
class StudioService {
  constructor(
    @InjectModel("Studio")
    private readonly studioModel: Model<Studio>,
  ) {}

  async getStudios(query: GeneralStudioQuery) {
    const { filter, page, count } = query

    return this.studioModel
      .find(getQueryObject(filter))
      .skip((page - 1) * count)
      .limit(count)
      .lean()
      .exec()
  }
}

export { StudioService }
