import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeCommentSchema } from "./schemas/animeComment.schema"
import { AnimeCommentLikeSchema } from "./schemas/animeCommentLike.schema"
import { AnimeCommentService } from "./services/animeComment.service"
import { AnimeCommentResolver } from "./resolvers/animeComment.resolver"
import { AnimeSchema } from "../anime/schemas/anime.schema"
import { AnimeCommentController } from "./controllers/animeComment.controller"
import { AnimeCommentLikeController } from "./controllers/animeCommentLike.controller"
import { AnimeCommentLikeService } from "./services/animeCommentLike.service"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Anime", schema: AnimeSchema },
      { name: "AnimeComment", schema: AnimeCommentSchema },
      { name: "AnimeCommentLike", schema: AnimeCommentLikeSchema },
    ]),
  ],
  controllers: [AnimeCommentController, AnimeCommentLikeController],
  providers: [
    AnimeCommentResolver,
    AnimeCommentService,
    AnimeCommentLikeService,
  ],
})
class AnimeCommentModule {}

export { AnimeCommentModule }
