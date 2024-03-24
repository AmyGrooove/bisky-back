import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Anime } from "../../anime/schemas/anime.schema"
import { AnimeEstimate } from "../schemas/animeEstimate.schema"
import { Model } from "mongoose"
import { EListStatus } from "../../../auxiliary"

@Injectable()
class AnimeEstimateService {
  constructor(
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
    @InjectModel("AnimeEstimate")
    private readonly animeEstimate: Model<AnimeEstimate>,
  ) {}

  async updateAnimeStatus(query: {
    userId: string
    animeId: string
    animeStatus: EListStatus | null
  }) {
    const { userId, animeId, animeStatus } = query

    if (!(await this.animeModel.findById(animeId).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeId,
      author: userId,
    })

    if (existingDocument) {
      existingDocument.status = animeStatus
      await existingDocument.save()
    } else {
      const newDocument = new this.animeEstimate({
        base: animeId,
        author: userId,
        status: animeStatus,
      })
      await newDocument.save()
    }

    return true
  }

  async updateAnimeScore(query: {
    userId: string
    animeId: string
    animeScore: number | null
  }) {
    const { userId, animeId, animeScore } = query

    if (!(await this.animeModel.findById(animeId).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeId,
      author: userId,
    })

    if (!existingDocument)
      throw new BadRequestException("This anime is not yet listed")

    existingDocument.score = animeScore
    await existingDocument.save()

    return true
  }

  async updateAnimeWatchedSeriesCount(query: {
    userId: string
    animeId: string
    animeWatchedSeriesCount: number
  }) {
    const { userId, animeId, animeWatchedSeriesCount } = query

    if (!(await this.animeModel.findById(animeId).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeId,
      author: userId,
    })

    if (!existingDocument)
      throw new BadRequestException("This anime is not yet listed")

    existingDocument.watchedSeries = animeWatchedSeriesCount
    await existingDocument.save()

    return true
  }

  async deleteAnimeFromList(query: { userId: string; animeId: string }) {
    const { userId, animeId } = query

    if (!(await this.animeModel.findById(animeId).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeId,
      author: userId,
    })

    if (!existingDocument)
      throw new BadRequestException("This anime is not yet listed")

    await existingDocument.deleteOne()

    return true
  }
}

export { AnimeEstimateService }
