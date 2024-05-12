import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Genre } from "../schemas/genre.schema"
import { getQueryObject } from "../../../functions"
import { GeneralGenreQuery } from "../queries/generalGenre.query"

@Injectable()
class GenreService {
  constructor(
    @InjectModel("Genre")
    private readonly genreModel: Model<Genre>,
  ) {}

  async getGenres(query: GeneralGenreQuery) {
    const { filter, page, count } = query

    return this.genreModel
      .find(getQueryObject(filter))
      .skip((page - 1) * count)
      .limit(count)
      .lean()
      .exec()
  }

  async getAllGenreIdsAndNames() {
    return this.genreModel.find().select("_id name").lean().exec()
  }
}

export { GenreService }
