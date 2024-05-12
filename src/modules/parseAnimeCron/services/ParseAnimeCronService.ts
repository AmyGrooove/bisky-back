import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { ParseAnimeSubService } from "./ParseAnimeSubService"
import axios from "axios"
import { IGenresShiki } from "../types/IGenresShiki"
import { genresQuery } from "../graphqlQuery/genresQuery"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Genre } from "../../genre/schemas/genre.schema"

@Injectable()
class ParseAnimeCronService {
  constructor(
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

  async parseGenres() {
    try {
      const mainInfo = await axios
        .post<IGenresShiki>(process.env.SHIKI_GRAPHQL_API, {
          query: genresQuery(),
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
