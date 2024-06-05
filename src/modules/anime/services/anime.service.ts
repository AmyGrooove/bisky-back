import { Model, Types } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { GeneralAnimeQuery } from "../queries/generalAnime.query"
import {
  getSortQueryAggregate,
  getQueryAggregateObject,
  convertIncorrectKeyboard,
} from "../../../functions"
import { Anime } from "../schemas/anime.schema"
import { User } from "../../user/schemas/user.schema"
import { UserFilterQuery } from "../queries/userFilter.query"
import {
  createAddFieldsStage,
  createScoreStage,
  createSearchMatch,
  createUserDataStage,
  createUsersListStage,
  getInListAnimeMatch,
} from "../functions/getAnimesFunctions"
import { IdAndUpdateDateModel } from "../entities/idAndUpdateDate.entity"

@Injectable()
class AnimeService {
  constructor(
    @InjectModel("Anime")
    private readonly animeModel: Model<Anime>,
    @InjectModel("User")
    private readonly userModel: Model<User>,
  ) {}

  async getSkippedAnimeMatch(
    userFilters: UserFilterQuery | null,
    userId?: string,
  ) {
    if (!userFilters?.isHiddenAnimeInSkipList || !userId) return []

    const skippedAnimeIds = (
      await this.userModel.findById(userId).lean().exec()
    ).skippedAnime.map((item) => new Types.ObjectId(item.animeId.toString()))

    return [
      {
        $match: { _id: { $nin: skippedAnimeIds } },
      },
    ]
  }

  async getAnimes({
    query,
    userId,
  }: {
    query: GeneralAnimeQuery
    userId?: string
  }) {
    const {
      page = 1,
      count = 10,
      limit,
      filter,
      sort,
      searchInput,
      isPaginationOff = false,
      userFilters,
      filterExclude,
    } = query

    const convertedSearchInput = searchInput
      ? convertIncorrectKeyboard(searchInput)
      : null
    const searchMatch = convertedSearchInput
      ? createSearchMatch(convertedSearchInput)
      : []
    const skippedAnime = await this.getSkippedAnimeMatch(userFilters, userId)
    const inListAnime = getInListAnimeMatch(userFilters, userId)

    return this.animeModel
      .aggregate(
        [
          ...skippedAnime,
          {
            $lookup: {
              from: "AnimeEstimate",
              localField: "_id",
              foreignField: "base",
              as: "estimatesCollection",
            },
          },
          createAddFieldsStage(limit),
          ...inListAnime,
          createUserDataStage(userId),
          createUsersListStage(),
          createScoreStage(),
          { $project: { estimatesCollection: 0, scoredCollection: 0 } },
          ...getQueryAggregateObject(filterExclude, true),
          ...getQueryAggregateObject(filter),
          ...searchMatch,
          ...getSortQueryAggregate(sort, isPaginationOff),
          { $skip: (page - 1) * count },
          { $limit: count },
        ],
        { allowDiskUse: true },
      )
      .exec()
  }

  async getAllAnimeIdsAndUpdateDate(): Promise<IdAndUpdateDateModel[]> {
    return (
      await this.animeModel.find().select("_id updateDate").lean().exec()
    ).map((item) => ({
      _id: item._id.toString(),
      ...item,
    })) as unknown as IdAndUpdateDateModel[]
  }
}

export { AnimeService }
