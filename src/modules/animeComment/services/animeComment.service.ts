import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { AnimeComment } from "../schemas/animeComment.schema"

@Injectable()
class AnimeCommentService {
  constructor(
    @InjectModel("AnimeComment")
    private readonly animeCommentModel: Model<AnimeComment>,
  ) {}
}

export { AnimeCommentService }
