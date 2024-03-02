import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Genres } from "../schemas/genres.schema"
import { getQueryObject } from "../../../functions"
import { SpecificGenresQuery } from "../resolvers/queries"

@Injectable()
class GenresService {
  constructor(
    @InjectModel("Genres")
    private readonly genresModel: Model<Genres>,
  ) {}

  async getGenres(count: number, specificValues: SpecificGenresQuery | null) {
    return this.genresModel
      .find(getQueryObject(specificValues))
      .limit(count)
      .lean()
      .exec()
  }
}

export { GenresService }
