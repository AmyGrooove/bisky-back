import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { HttpService } from "@nestjs/axios"
import { Logger } from "@nestjs/common"

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

  private readonly logger = new Logger(ParseAnimeCronService.name)

  @Cron(CronExpression.EVERY_2_HOURS)
  async updateNewAnime() {
    this.logger.debug("updateNewAnime started")

    const animesData = await this.parseAnimeSubService.getUpdatingAnimesData()

    await this.parseAnimeSubService.updateAnimes(animesData)
  }

  @Cron(CronExpression.EVERY_WEEK)
  async parseAnimesByYear() {
    this.logger.debug("parseAnimesByYear started")

    const animesData = await this.parseAnimeSubService.getAnimesDataByYear(
      1000,
      3000,
    )

    await this.parseAnimeSubService.updateAnimes(animesData)
  }

  @Cron("0 0 1 1 *")
  async parseGenres() {
    this.logger.debug("parseGenres started")

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
      this.logger.error(error)
    }
  }
}

export { ParseAnimeCronService }
