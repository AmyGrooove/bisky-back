import { Model, Types } from "mongoose"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { User } from "../schemas/user.schema"
import { CreateUserDto } from "../../auth/dto/createUser.dto"
import { UpdateUserDto } from "../../auth/dto/updateUser.dto"
import { GeneralUserQuery } from "../queries/generalUser.query"
import { getQueryAggregateObject } from "../../../functions"
import { createAnimeListStage } from "../functions/getUserData"

@Injectable()
class UserService {
  constructor(
    @InjectModel("User")
    private readonly userModel: Model<User>,
  ) {}

  async getUser(query: GeneralUserQuery, userId?: string) {
    const { filter, animeListStatus } = query

    const filteredProps = getQueryAggregateObject(
      userId ? { _id_ID: [userId] } : filter,
    )

    if (filteredProps.length === 0)
      throw new BadRequestException("Invalid data entered")

    const filterAnimes = animeListStatus
      ? [
          {
            $addFields: {
              animeEstimates: {
                $filter: {
                  input: "$animeEstimates",
                  as: "estimate",
                  cond: { $eq: ["$$estimate.status", animeListStatus] },
                },
              },
            },
          },
        ]
      : []

    const data = (
      await this.userModel.aggregate([
        ...filteredProps,
        {
          $lookup: {
            from: "AnimeEstimate",
            localField: "_id",
            foreignField: "author",
            as: "animeEstimates",
          },
        },
        { ...createAnimeListStage() },
        ...filterAnimes,
      ])
    )[0]

    if (!data) throw new BadRequestException("The entered user does not exist")

    return data
  }

  async findPublicUserData(query: {
    _id?: string | null
    username?: string | null
    email?: string | null
  }) {
    const filteredProps = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(query).filter(([_, value]) => value !== null),
    )

    return this.userModel
      .findOne(filteredProps)
      .select({
        passwordHash: 0,
        refreshToken: 0,
        favorites: 0,
        skippedAnime: 0,
        subscriptions: 0,
        userPersonalization: 0,
      })
      .lean()
      .exec()
  }

  async findFullUserById(userId: string) {
    return this.userModel.findById(userId).lean().exec()
  }

  async createNewUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      username: createUserDto.username,
      passwordHash: createUserDto.password,
      email: createUserDto.email,
    })

    return createdUser.save()
  }

  async updateUser(query: { _id: string; updateUserDto: UpdateUserDto }) {
    const { _id, updateUserDto } = query

    return this.userModel.findByIdAndUpdate(_id, updateUserDto).lean().exec()
  }

  async subscribeToUser(query: { userId: string; subscribeUserId: string }) {
    const { userId, subscribeUserId } = query

    if (!Types.ObjectId.isValid(subscribeUserId))
      throw new BadRequestException("ObjectId error")

    if (!(await this.userModel.findById(subscribeUserId).lean().exec()))
      throw new BadRequestException("No such user")

    const currentUser = await this.userModel.findOne({ _id: userId })

    if (
      currentUser.subscriptions.find(
        (item) => item.toString() === subscribeUserId,
      )
    )
      throw new BadRequestException("Already subscribed")

    currentUser.subscriptions.push(new Types.ObjectId(subscribeUserId) as any)
    await currentUser.save()

    return true
  }

  async unSubscribeFromUser(query: {
    userId: string
    subscribeUserId: string
  }) {
    const { userId, subscribeUserId } = query

    const currentUser = await this.userModel.findOne({ _id: userId })

    if (
      !currentUser.subscriptions.find(
        (item) => item.toString() === subscribeUserId,
      )
    )
      throw new BadRequestException("No such user found in user subscriptions")

    currentUser.subscriptions = currentUser.subscriptions.filter(
      (item) => item.toString() !== subscribeUserId,
    )
    await currentUser.save()

    return true
  }
}

export { UserService }
