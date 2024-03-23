import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Anime } from "../../anime/schemas/anime.schema"
import { AnimeEstimate } from "../schemas/animeEstimate.schema"
import { Model, ObjectId, Types } from "mongoose"
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
    userId: ObjectId
    animeId: ObjectId
    animeStatus: EListStatus | null
  }) {
    const { userId, animeId, animeStatus } = query

    const animeIdParsed = new Types.ObjectId(animeId as unknown as string)
    const userIdParsed = new Types.ObjectId(userId as unknown as string)

    if (!(await this.animeModel.findById(animeIdParsed).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeIdParsed,
      author: userIdParsed,
    })

    if (!existingDocument && animeStatus === null)
      throw new BadRequestException("This anime is not yet listed")

    if (existingDocument) {
      if (animeStatus === null) await existingDocument.deleteOne()
      else {
        existingDocument.status = animeStatus
        await existingDocument.save()
      }
    } else {
      const newDocument = new this.animeEstimate({
        base: animeIdParsed,
        author: userIdParsed,
        status: animeStatus,
      })
      await newDocument.save()
    }

    return true
  }

  async updateAnimeScore(query: {
    userId: ObjectId
    animeId: ObjectId
    animeScore: number | null
  }) {
    const { userId, animeId, animeScore } = query

    const animeIdParsed = new Types.ObjectId(animeId as unknown as string)
    const userIdParsed = new Types.ObjectId(userId as unknown as string)

    if (!(await this.animeModel.findById(animeIdParsed).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeIdParsed,
      author: userIdParsed,
    })

    if (!existingDocument)
      throw new BadRequestException("This anime is not yet listed")

    existingDocument.score = animeScore
    await existingDocument.save()

    return true
  }

  async updateAnimeWatchedSeriesCount(query: {
    userId: ObjectId
    animeId: ObjectId
    animeWatchedSeriesCount: number
  }) {
    const { userId, animeId, animeWatchedSeriesCount } = query

    const animeIdParsed = new Types.ObjectId(animeId as unknown as string)
    const userIdParsed = new Types.ObjectId(userId as unknown as string)

    if (!(await this.animeModel.findById(animeIdParsed).lean().exec()))
      throw new BadRequestException("No such anime found")

    const existingDocument = await this.animeEstimate.findOne({
      base: animeIdParsed,
      author: userIdParsed,
    })

    if (!existingDocument)
      throw new BadRequestException("This anime is not yet listed")

    existingDocument.watchedSeries = animeWatchedSeriesCount
    await existingDocument.save()

    return true
  }
}

export { AnimeEstimateService }
