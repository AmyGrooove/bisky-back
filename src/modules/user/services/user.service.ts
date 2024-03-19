import { Model, ObjectId } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { CreateUserDto } from "../dto/createUser.dto"
import { UpdateUserDto } from "../dto/updateUser.dto"

@Injectable()
class UserService {
  constructor(
    @InjectModel("User")
    private readonly userModel: Model<User>,
  ) {}

  async createNewUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      username: createUserDto.username,
      passwordHash: createUserDto.password,
      email: createUserDto.email,
    })

    return createdUser.save()
  }

  async findFullUserById(_id: ObjectId) {
    return this.userModel.findById(_id).lean().exec()
  }

  async findPublicUserData(props: { _id?: ObjectId; username?: string }) {
    return this.userModel
      .findOne(props)
      .select({ passwordHash: 0, refreshToken: 0 })
      .lean()
      .exec()
  }

  async getUser(props: { _id?: ObjectId; username?: string }) {}

  async checkUser(props: { username: string; email: string }) {
    const { username, email } = props

    const user = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .lean()
      .exec()

    return !!user
  }

  async updateUser(props: { _id: ObjectId; updateUserDto: UpdateUserDto }) {
    const { _id, updateUserDto } = props

    return this.userModel.findByIdAndUpdate(_id, updateUserDto).lean().exec()
  }
}

export { UserService }
