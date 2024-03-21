import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeCommentSchema } from "./schemas/animeComment.schema"
import { AnimeCommentLikeSchema } from "./schemas/animeCommentLike.schema"
import { AnimeCommentService } from "./services/animeComment.service"
import { AnimeCommentResolver } from "./resolvers/animeComment.resolver"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "AnimeComment", schema: AnimeCommentSchema },
      { name: "AnimeCommentLike", schema: AnimeCommentLikeSchema },
    ]),
  ],
  providers: [AnimeCommentResolver, AnimeCommentService],
})
class AnimeCommentModule {}

export { AnimeCommentModule }
