import { Model, ObjectId } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"

@Injectable()
class UserService {
  constructor(
    @InjectModel("User")
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      username: createUserDto.username,
      passwordHash: createUserDto.password,
      email: createUserDto.email,
    })
    return createdUser.save()
  }

  async findById(id: ObjectId) {
    return this.userModel.findById(id).lean().exec()
  }

  async findPublicById(id: ObjectId) {
    return this.userModel
      .findById(id)
      .select({ passwordHash: 0, refreshToken: 0 })
      .lean()
      .exec()
  }

  async findByUsername(username: string) {
    return this.userModel
      .findOne({ username })
      .select({ _id: 1, username: 1, image: 1, role: 1, avatar: 1, name: 1 })
      .lean()
      .exec()
  }

  async checkUser(username: string, email: string) {
    const user = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .lean()
      .exec()

    return user !== undefined
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec()
  }
}

export { UserService }
