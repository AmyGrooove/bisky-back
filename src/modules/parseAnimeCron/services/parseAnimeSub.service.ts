import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Schema } from "mongoose"
import { HttpService } from "@nestjs/axios"

import { IAnimeShiki, IAnimeShikiGraph } from "../types/IAnimeShiki"
import { animesGetQuery } from "../graphqlQuery/animesGetQuery"
import { EStatus } from "../../../auxiliary"
import { Anime, AnimeDocument } from "../../anime/schemas/anime.schema"
// import { Platform } from "../../platform/schemas/platform.schema"
import { Studio } from "../../studio/schemas/studio.schema"
import { Franchise } from "../../franchise/schemas/franchise.schema"
import { Genre } from "../../genre/schemas/genre.schema"
import { checkFirstTimeMore } from "../../../functions"

@Injectable()
class ParseAnimeSubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
    // @InjectModel("Platform")
    // private readonly platformModel: Model<Platform>,
    @InjectModel("Studio")
    private readonly studioModel: Model<Studio>,
    @InjectModel("Franchise")
    private readonly franchiseModel: Model<Franchise>,
    @InjectModel("Genre")
    private readonly genreModel: Model<Genre>,
  ) {}
  private readonly logger = new Logger(ParseAnimeSubService.name)

  async getAnimesDataByYear(
    from: number = new Date().getFullYear(),
    to?: number,
  ) {
    let page = 1
    let animeInfos: IAnimeShiki[] = []

    /*eslint-disable no-constant-condition*/
    while (true) {
      try {
        const newInfo = await this.httpService.axiosRef
          .post<IAnimeShikiGraph>(process.env.SHIKI_GRAPHQL_API, {
            query: animesGetQuery(
              page,
              `season: "${to ? from + "_" + to : from}"`,
            ),
          })
          .then((response) => response.data.data.animes)

        if (newInfo.length === 0) break

        animeInfos = [...animeInfos, ...newInfo]
        page++

        await new Promise((res) =>
          setTimeout(res, Number(process.env.PAGE_DELAY_COUNT)),
        )
      } catch (error: any) {
        this.logger.warn("delay... " + error.message)

        await new Promise((res) =>
          setTimeout(res, Number(process.env.ERROR_DELAY_COUNT)),
        )
      }
    }

    this.logger.log(
      `Animes received (count: ${animeInfos.length}) (pages: ${page})`,
    )
    return animeInfos
  }

  async getUpdatingAnimesData() {
    let page = 1
    let animeInfos: IAnimeShiki[] = []

    while (true) {
      try {
        const newInfo = await this.httpService.axiosRef
          .post<IAnimeShikiGraph>(process.env.SHIKI_GRAPHQL_API, {
            query: animesGetQuery(page, `status: "!${EStatus.released}"`),
          })
          .then((response) => response.data.data.animes)

        if (newInfo.length === 0) break

        animeInfos = [...animeInfos, ...newInfo]
        page++

        await new Promise((res) =>
          setTimeout(res, Number(process.env.PAGE_DELAY_COUNT)),
        )
      } catch (error: any) {
        this.logger.warn("delay... " + error.message)

        await new Promise((res) =>
          setTimeout(res, Number(process.env.ERROR_DELAY_COUNT)),
        )
      }
    }

    this.logger.log(
      `Ongoing/Anons Animes received (count: ${animeInfos.length}) (pages: ${page})`,
    )

    page = 1

    const releasedAnimeIds = (
      await this.animeModel.find({
        status: { $in: [EStatus.anons, EStatus.ongoing] },
        shikiId: { $nin: animeInfos.map((el) => el.id) },
      })
    ).map((el) => el.shikiId)

    while (releasedAnimeIds.length !== 0) {
      try {
        const newInfo = await this.httpService.axiosRef
          .post<IAnimeShikiGraph>(process.env.SHIKI_GRAPHQL_API, {
            query: animesGetQuery(
              page,
              `ids: "${releasedAnimeIds.join(", ")}"`,
            ),
          })
          .then((response) => response.data.data.animes)

        if (newInfo.length === 0) break

        animeInfos = [...animeInfos, ...newInfo]
        page++

        await new Promise((res) =>
          setTimeout(res, Number(process.env.PAGE_DELAY_COUNT)),
        )
      } catch (error: any) {
        this.logger.warn("delay... " + error.message)

        await new Promise((res) =>
          setTimeout(res, Number(process.env.ERROR_DELAY_COUNT)),
        )
      }
    }

    this.logger.log(
      releasedAnimeIds.length === 0
        ? "No anime released yet"
        : `Released Anime received (${releasedAnimeIds.length})`,
    )
    return animeInfos
  }

  async updateAnimes(animes: IAnimeShiki[] = []) {
    try {
      let newAnimesSeries = 0

      const newAnimes = await Promise.all(
        animes.map(async (el) => {
          const animeGenres = (
            await this.genreModel
              .find({
                "name.en": { $in: el.genres.map((item) => item.name) },
              })
              .select("_id")
              .lean()
              .exec()
          ).map((item) => item._id)

          // const animePlatforms = (
          //   await this.platformModel
          //     .find({
          //       shikiId: { $in: el.externalLinks.map((item) => item.kind) },
          //     })
          //     .select("_id")
          //     .lean()
          //     .exec()
          // ).map((item, index) => ({
          //   url: el.externalLinks[index].url,
          //   platform: item._id,
          // }))

          const animeInfo = await this.animeModel
            .findOne({
              shikiId: el.id,
            })
            .select("episodes description")
            .lean()
            .exec()

          const studioOperations = el.studios.map((item) => ({
            updateOne: {
              filter: { name: item.name },
              update: { name: item.name, logo: item.imageUrl ?? null },
              upsert: true,
            },
          }))

          await this.studioModel.bulkWrite(studioOperations)

          const animeStudios = (
            await this.studioModel
              .find({
                name: { $in: el.studios.map((item) => item.name) },
              })
              .select("_id")
              .lean()
              .exec()
          ).map((item) => item._id)

          if (el.franchise) {
            const franchiseOperation = [
              {
                updateOne: {
                  filter: { shikiId: el.franchise },
                  update: { shikiId: el.franchise },
                  upsert: true,
                },
              },
            ]

            await this.franchiseModel.bulkWrite(franchiseOperation)
          }

          const animeFranchise =
            (
              await this.franchiseModel
                .findOne({ shikiId: el.franchise })
                .select("_id")
                .lean()
                .exec()
            )?._id ?? null

          if (
            checkFirstTimeMore(
              el.nextEpisodeAt,
              animeInfo?.episodes?.nextEpisodeAiredDate,
            )
          )
            newAnimesSeries++

          return {
            shikiId: Number(el.id),
            labels: {
              en: el.name,
              ru: el.russian,
              synonyms: [el.japanese, ...el.synonyms].filter((item) => item),
            },
            poster: el.poster?.originalUrl ?? null,
            kind: el.kind,
            otherPlatforms: [],
            // animePlatforms,
            status: el.status,
            episodes: {
              count: el.episodes === 0 ? null : Number(el.episodes),
              airedCount:
                el.status === "released"
                  ? el.episodes
                  : el.episodesAired === 0
                  ? null
                  : Number(el.episodesAired),
              duration:
                el.duration === null || el.duration === 0
                  ? null
                  : Number(el.duration),
              nextEpisodeAiredDate: el.nextEpisodeAt
                ? new Date(el.nextEpisodeAt)
                : null,
              lastEpisodeAiredDate:
                el.status === "released" &&
                (el.releasedOn.date || el.airedOn.date)
                  ? new Date(el.releasedOn.date ?? el.airedOn.date)
                  : el.status === "anons"
                  ? null
                  : checkFirstTimeMore(
                      el.nextEpisodeAt,
                      animeInfo?.episodes?.nextEpisodeAiredDate,
                    )
                  ? animeInfo?.episodes?.nextEpisodeAiredDate
                  : animeInfo?.episodes?.lastEpisodeAiredDate ?? null,
            },
            dates: {
              airedOn: el.airedOn.date ? new Date(el.airedOn.date) : null,
              releasedOn: el.releasedOn.date
                ? new Date(el.releasedOn.date)
                : null,
            },
            rating: el.rating,
            description: {
              ru:
                el.description
                  ?.replace(/\r\n/g, "")
                  .replace(/\[\[(.*?)\]\]/g, "$1")
                  .replace(/\[[^\]]*]/g, "")
                  .replace(/\([^)]*\)/g, "") ?? null,
              en: animeInfo?.description?.en ?? null,
            },
            related: el.related
              .map((item) => ({
                base: null,
                shikiId: item.anime?.id ? Number(item.anime?.id) : null,
                relation: { ru: item.relationRu, en: item.relationEn },
              }))
              .filter((item) => item.shikiId),
            screenshots: el.screenshots.map((item) => item.originalUrl),
            videos: el.videos.map((item) => ({
              name: item.name,
              url: item.url,
            })),
            genres: animeGenres as unknown as Schema.Types.ObjectId[],
            studios: animeStudios as unknown as Schema.Types.ObjectId[],
            franchise: animeFranchise as unknown as Schema.Types.ObjectId,
            updateDate: new Date(),
          } as AnimeDocument
        }),
      )

      this.logger.log(
        newAnimesSeries === 0
          ? "There's no new anime series"
          : `Only so many anime have a new series out (${newAnimesSeries})`,
      )

      const operations = newAnimes.map((item) => ({
        updateOne: {
          filter: { shikiId: item.shikiId },
          update: item as Record<string, any>,
          upsert: true,
        },
      }))

      await this.animeModel.bulkWrite(operations)
      this.logger.log("Database updated")

      await this.updateAnimesRelations()
    } catch (error) {
      console.error(error)
    }
  }

  async updateAnimesRelations() {
    const allAnimes = await this.animeModel.find().lean().exec()

    const operations = await Promise.all(
      allAnimes.map(async (el) => {
        const relationAnimes = await this.animeModel
          .find({
            shikiId: { $in: el.related.map((item) => item.shikiId) },
          })
          .select("_id shikiId")
          .lean()
          .exec()

        const newAnime = {
          ...el,
          related: el.related.map((item) => ({
            ...item,
            base:
              relationAnimes.find(
                (relation) => relation.shikiId === item.shikiId,
              )?._id ?? null,
          })),
        }

        return {
          updateOne: {
            filter: { shikiId: el.shikiId },
            update: newAnime as Record<string, any>,
            upsert: true,
          },
        }
      }),
    )

    await this.animeModel.bulkWrite(operations)

    this.logger.log("Anime connections updated")
  }
}

export { ParseAnimeSubService }
