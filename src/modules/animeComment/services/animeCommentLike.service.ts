import { Model } from "mongoose"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeComment } from "../schemas/animeComment.schema"
import { AnimeCommentLike } from "../schemas/animeCommentLike.schema"

@Injectable()
class AnimeCommentLikeService {
  constructor(
    @InjectModel("AnimeComment")
    private readonly animeCommentModel: Model<AnimeComment>,
    @InjectModel("AnimeCommentLike")
    private readonly animeCommentLikeModel: Model<AnimeCommentLike>,
  ) {}

  async updateAnimeCommentLike(query: {
    userId: string
    commentId: string
    like: boolean | null
  }) {
    const { userId, commentId, like } = query

    if (!(await this.animeCommentModel.findById(commentId).lean().exec()))
      throw new BadRequestException("No such comment found")

    const existingDocument = await this.animeCommentLikeModel.findOne({
      base: commentId,
      author: userId,
    })

    if (!existingDocument) {
      if (like === null) throw new BadRequestException("Like doesn't exist")
      else {
        const newDocument = new this.animeCommentLikeModel({
          base: commentId,
          author: userId,
          isLiked: like,
        })
        await newDocument.save()
      }
    } else {
      if (like === null) await existingDocument.deleteOne()
      else {
        existingDocument.isLiked = like
        existingDocument.updateTime = new Date()
        await existingDocument.save()
      }
    }

    return true
  }
}

export { AnimeCommentLikeService }
