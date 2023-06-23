import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, ObjectId } from "mongoose"
import { CreateUserDto } from "./dto/create-user.dto"
import { Users } from "./schemas/users.schema"
import { UpdateUserDto } from "./dto/update-user.dto"
import { FindByUsername } from "./types"

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(createUserDto)
    return createdUser.save()
  }

  async findById(id: ObjectId): Promise<Users> {
    return this.usersModel.findById(id).lean().exec()
  }

  async findByUsername(username: string): Promise<FindByUsername> {
    return this.usersModel
      .findOne({ username })
      .select({ _id: 1, username: 1, image: 1, role: 1, name: 1 })
      .lean()
      .exec()
  }

  async checkUser(username: string, email: string): Promise<boolean> {
    const user = await this.usersModel
      .findOne({ $or: [{ username }, { email }] })
      .lean()
      .exec()

    return user !== undefined
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto).exec()
  }
}
