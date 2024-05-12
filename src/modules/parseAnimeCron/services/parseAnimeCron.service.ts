import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { HttpService } from "@nestjs/axios"

import { IGenresShiki } from "../types/IGenresShiki"
import { Genre } from "../../genre/schemas/genre.schema"
import { genresGetQuery } from "../graphqlQuery/genresGetQuery"

import { ParseAnimeSubService } from "./parseAnimeSub.service"

@Injectable()
class ParseAnimeCronService {
  constructor(
    private readonly httpService: HttpService,
    private readonly parseAnimeSubService: ParseAnimeSubService,
    @InjectModel("Genre")
    private readonly genreModel: Model<Genre>,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async updateNewAnime() {
    const animesData = await this.parseAnimeSubService.getUpdatingAnimesData()

    await this.parseAnimeSubService.updateAnimes(animesData)
  }

  @Cron(CronExpression.EVERY_WEEK)
  async parseAnimesByYear() {
    const animesData = await this.parseAnimeSubService.getAnimesDataByYear(
      1000,
      3000,
    )

    await this.parseAnimeSubService.updateAnimes(animesData)
  }

  @Cron("0 0 1 1 *")
  async parseGenres() {
    try {
      const mainInfo = await this.httpService.axiosRef
        .post<IGenresShiki>(process.env.SHIKI_GRAPHQL_API, {
          query: genresGetQuery(),
        })
        .then((response) => response.data.data.genres)

      const operations = mainInfo.map((el) => ({
        updateOne: {
          filter: { name: { en: el.name, ru: el.russian } },
          update: { name: { en: el.name, ru: el.russian } },
          upsert: true,
        },
      }))

      await this.genreModel.bulkWrite(operations)
    } catch (error) {
      console.error(error)
    }
  }
}

export { ParseAnimeCronService }
