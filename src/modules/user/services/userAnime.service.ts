import { Model, Types } from "mongoose"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { User } from "../schemas/user.schema"
import { Anime } from "../../anime/schemas/anime.schema"

@Injectable()
class UserAnimeService {
  constructor(
    @InjectModel("User")
    private readonly userModel: Model<User>,
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
  ) {}

  async skipAnime(query: { userId: string; animeId: string }) {
    const { userId, animeId } = query

    if (!(await this.animeModel.findById(animeId).lean().exec()))
      throw new BadRequestException("No such anime found")

    const currentUser = await this.userModel.findOne({ _id: userId })

    if (
      currentUser.skippedAnime.find(
        (item) => item.animeId.toString() === animeId,
      )
    )
      throw new BadRequestException("Anime already in list")

    currentUser.skippedAnime.push({
      animeId: new Types.ObjectId(animeId),
      updateDate: new Date(),
    } as any)
    await currentUser.save()

    return true
  }

  async removeFromSkipAnime(query: { userId: string; animeId: string }) {
    const { userId, animeId } = query

    const currentUser = await this.userModel.findOne({ _id: userId })

    if (
      !currentUser.skippedAnime.find(
        (item) => item.animeId.toString() === animeId,
      )
    )
      throw new BadRequestException("No such anime found in user skipped list")

    currentUser.skippedAnime.filter(
      (item) => item.animeId.toString() !== animeId,
    )
    await currentUser.save()

    return this.userModel.findById(userId).lean().exec()
  }
}

export { UserAnimeService }
