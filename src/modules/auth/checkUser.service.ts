import { ForbiddenException, Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { Users } from "./schemas/users.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model, ObjectId } from "mongoose"

@Injectable()
export class CheckUserService {
  constructor(
    @InjectModel("Users")
    private readonly usersModel: Model<Users>,
  ) {}

  async checkUser(username: string): Promise<ObjectId> {
    const user = await this.usersModel.findOne({ username }).lean().exec()

    if (!user) throw new ForbiddenException("There is no such user")

    return user._id
  }

  async checkPassword(id: ObjectId, pass: string) {
    const { password, ...result } = await this.usersModel
      .findById(id)
      .lean()
      .exec()

    if (!(await bcrypt.compare(pass, password)))
      throw new ForbiddenException("Access Denied")

    return result
  }
}
