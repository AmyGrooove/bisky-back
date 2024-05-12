import { Injectable } from "@nestjs/common"
import { IAnimeShiki, IAnimeShikiGraph } from "../types/IAnimeShiki"
import { animesQuery } from "../graphqlQuery/animesQuery"
import { EStatus } from "../../../auxiliary"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Anime } from "../../anime/schemas/anime.schema"
import { Platform } from "../../platform/schemas/platform.schema"
import { Studio } from "../../studio/schemas/studio.schema"
import { Franchise } from "../../franchise/schemas/franchise.schema"
import { Genre } from "../../genre/schemas/genre.schema"
import { HttpService } from "@nestjs/axios"

@Injectable()
class ParseAnimeSubService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
    @InjectModel("Platform")
    private readonly platformModel: Model<Platform>,
    @InjectModel("Studio")
    private readonly studioModel: Model<Studio>,
    @InjectModel("Franchise")
    private readonly franchiseModel: Model<Franchise>,
    @InjectModel("Genre")
    private readonly genreModel: Model<Genre>,
  ) {}

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
            query: animesQuery(
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
        await new Promise((res) =>
          setTimeout(res, Number(process.env.ERROR_DELAY_COUNT)),
        )
      }
    }

    return animeInfos
  }

  async getUpdatingAnimesData() {
    let page = 1
    let animeInfos: IAnimeShiki[] = []

    while (true) {
      try {
        const newInfo = await this.httpService.axiosRef
          .post<IAnimeShikiGraph>(process.env.SHIKI_GRAPHQL_API, {
            query: animesQuery(page, `status: "!${EStatus.released}"`),
          })
          .then((response) => response.data.data.animes)

        if (newInfo.length === 0) break

        animeInfos = [...animeInfos, ...newInfo]
        page++

        await new Promise((res) =>
          setTimeout(res, Number(process.env.PAGE_DELAY_COUNT)),
        )
      } catch (error: any) {
        await new Promise((res) =>
          setTimeout(res, Number(process.env.ERROR_DELAY_COUNT)),
        )
      }
    }

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
            query: animesQuery(page, `ids: "${releasedAnimeIds.join(", ")}"`),
          })
          .then((response) => response.data.data.animes)

        if (newInfo.length === 0) break

        animeInfos = [...animeInfos, ...newInfo]
        page++

        await new Promise((res) =>
          setTimeout(res, Number(process.env.PAGE_DELAY_COUNT)),
        )
      } catch (error: any) {
        await new Promise((res) =>
          setTimeout(res, Number(process.env.ERROR_DELAY_COUNT)),
        )
      }
    }

    return animeInfos
  }

  async updateAnimes(animes: IAnimeShiki[] = []) {
    try {
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

          const animePlatforms = (
            await this.platformModel
              .find({
                shikiId: { $in: el.externalLinks.map((item) => item.kind) },
              })
              .select("_id")
              .lean()
              .exec()
          ).map((item, index) => ({
            url: el.externalLinks[index].url,
            platform: item._id,
          }))

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

          const newEpisodesCount =
            Number(
              el.status === "released" ? el.episodes : el.episodesAired + 1,
            ) - (animeInfo?.episodes?.singleEpisodes?.length ?? 0)

          return {
            shikiId: Number(el.id),
            labels: {
              en: el.name,
              ru: el.russian,
              synonyms: [el.japanese, ...el.synonyms].filter((item) => item),
            },
            poster: el.poster?.originalUrl ?? null,
            kind: el.kind,
            otherPlatforms: animePlatforms,
            status: el.status,
            episodes: {
              count: el.episodes === 0 ? null : Number(el.episodes),
              singleEpisodes: [
                ...(animeInfo?.episodes?.singleEpisodes ?? []),
                ...[...Array(newEpisodesCount < 0 ? 0 : newEpisodesCount)].map(
                  (_, index) => ({
                    name: null,
                    airedAt:
                      index === el.episodesAired && el.nextEpisodeAt
                        ? new Date(el.nextEpisodeAt)
                        : null,
                    duration: el.duration,
                  }),
                ),
              ],
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
            genres: animeGenres,
            studios: animeStudios,
            franchise: animeFranchise,
            updateDate: new Date(),
          }
        }),
      )

      const operations = newAnimes.map((item) => ({
        updateOne: {
          filter: { shikiId: item.shikiId },
          update: item as Record<string, any>,
          upsert: true,
        },
      }))

      await this.animeModel.bulkWrite(operations)

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
  }
}

export { ParseAnimeSubService }
