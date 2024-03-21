import { Model, ObjectId, Types } from "mongoose"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { AnimeComment } from "../schemas/animeComment.schema"
import { SortAnimeCommentQuery } from "../query/sortAnimeComment.query"
import { getSortQueryAggregate } from "../../../functions"

@Injectable()
class AnimeCommentService {
  constructor(
    @InjectModel("AnimeComment")
    private readonly animeCommentModel: Model<AnimeComment>,
  ) {}

  async getComments(props: {
    base: ObjectId
    page: number
    count: number
    sort: SortAnimeCommentQuery
  }) {
    const { base, page, count, sort } = props

    try {
      return this.animeCommentModel.aggregate([
        { $match: { base: new Types.ObjectId(base as unknown as string) } },
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
}

export { AnimeCommentService }
