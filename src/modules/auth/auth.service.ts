import { ForbiddenException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "./dto/create-user.dto"
import { Users } from "./schemas/users.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model, ObjectId } from "mongoose"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("Users")
    private readonly usersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { username: user.username, sub: user._id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(user: CreateUserDto) {
    if (!user.email || !user.password || !user.username)
      throw new ForbiddenException("Invalid input")

    const foundUser = await this.usersModel
      .findOne({ $or: [{ username: user.username }, { email: user.email }] })
      .lean()
      .exec()

    if (foundUser) throw new ForbiddenException("User already exist")

    const newUser = new this.usersModel({
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    })

    await newUser.save()

    return this.login({
      username: user.username,
      password: user.password,
    })
  }

  async getUserInfo(userId: ObjectId) {
    return this.usersModel
      .findById(userId)
      .select({ _id: 0, username: 1, email: 1, image: 1, role: 1, name: 1 })
      .lean()
      .exec()
  }
}
