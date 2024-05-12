import { Model, Types } from "mongoose"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { AnimeComment } from "../schemas/animeComment.schema"
import { SortAnimeCommentQuery } from "../query/sortAnimeComment.query"
import { getSortQueryAggregate } from "../../../functions"
import { Anime } from "../../anime/schemas/anime.schema"
import { AnimeCommentLike } from "../schemas/animeCommentLike.schema"

@Injectable()
class AnimeCommentService {
  constructor(
    @InjectModel("AnimeComment")
    private readonly animeCommentModel: Model<AnimeComment>,
    @InjectModel("AnimeCommentLike")
    private readonly animeCommentLikeModel: Model<AnimeCommentLike>,
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
  ) {}

  async getComments(query: {
    animeId: string
    page: number
    count: number
    sort: SortAnimeCommentQuery
  }) {
    const { animeId, page, count, sort } = query

    try {
      return this.animeCommentModel.aggregate([
        { $match: { base: new Types.ObjectId(animeId) } },
        {
          $lookup: {
            from: "User",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $lookup: {
            from: "AnimeCommentLike",
            localField: "_id",
            foreignField: "base",
            as: "likesCollection",
          },
        },
        {
          $addFields: {
            likesCount: {
              $sum: {
                $map: {
                  input: "$likesCollection",
                  as: "like",
                  in: { $cond: [{ $eq: ["$$like.isLiked", true] }, 1, -1] },
                },
              },
            },
            parent: {
              $cond: {
                if: { $eq: ["$parent", null] },
                then: null,
                else: { $arrayElemAt: ["$parentCollection", 0] },
              },
            },
          },
        },
        { $project: { likesCollection: 0, parentCollection: 0 } },
        ...getSortQueryAggregate(sort),
        { $skip: (page - 1) * count },
        { $limit: count },
      ])
    } catch (error: any) {
      throw new BadRequestException(error.message)
    }
  }

  async addAnimeComment(query: {
    userId: string
    animeId: string
    text: string
  }) {
    const { userId, animeId, text } = query

    if (!(await this.animeModel.findById(animeId).lean().exec()))
      throw new BadRequestException("No such anime found")

    const newDocument = new this.animeCommentModel({
      base: animeId,
      author: userId,
      text: text,
    })
    await newDocument.save()

    return true
  }

  async updateAnimeComment(query: {
    userId: string
    commentId: string
    text: string
  }) {
    const { userId, commentId, text } = query

    const existingDocument = await this.animeCommentModel.findById(commentId)

    if (!existingDocument)
      throw new BadRequestException("No such comment found")

    if (String(existingDocument.author) !== userId)
      throw new BadRequestException("The comment does not belong to the user")

    existingDocument.text = text
    existingDocument.updateTime = new Date()
    await existingDocument.save()

    return true
  }

  async deleteAnimeComment(query: { userId: string; commentId: string }) {
    const { userId, commentId } = query

    const existingDocument = await this.animeCommentModel.findById(commentId)

    if (!existingDocument)
      throw new BadRequestException("No such comment found")

    if (String(existingDocument.author) !== userId)
      throw new BadRequestException("The comment does not belong to the user")

    await existingDocument.deleteOne()

    return true
  }

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

export { AnimeCommentService }
