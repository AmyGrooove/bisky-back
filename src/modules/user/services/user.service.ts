import { Model } from "mongoose"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { CreateUserDto } from "../../auth/dto/createUser.dto"
import { UpdateUserDto } from "../../auth/dto/updateUser.dto"

@Injectable()
class UserService {
  constructor(
    @InjectModel("User")
    private readonly userModel: Model<User>,
  ) {}

  async getUser(query: { _id?: string; username?: string }) {
    const filteredProps = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== null),
    )

    if (Object.keys(filteredProps).length === 0)
      throw new BadRequestException("Invalid data entered")

    const data = (
      await this.userModel.aggregate([
        { $match: filteredProps },
        {
          $lookup: {
            from: "AnimeEstimate",
            localField: "_id",
            foreignField: "author",
            as: "animeEstimates",
          },
        },
        {
          $lookup: {
            from: "AnimeList",
            localField: "_id",
            foreignField: "author",
            as: "animeLists",
          },
        },
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
      Object.entries(query).filter(([_, value]) => value !== null),
    )

    return this.userModel
      .findOne(filteredProps)
      .select({ passwordHash: 0, refreshToken: 0 })
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
}

export { UserService }
