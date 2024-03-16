import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"

@Injectable()
class UserService {
  constructor(
    @InjectModel("User")
    private readonly userPublicModel: Model<User>,
  ) {}
}

export { UserService }
