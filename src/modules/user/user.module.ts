import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserResolver } from "./resolvers/user.resolver"
import { UserSchema } from "./schemas/user.schema"
import { UserService } from "./services/user.service"
import { AnimeEstimateSchema } from "./schemas/animeEstimate.schema"
import { AnimeEstimateController } from "./controllers/animeEstimate.controller"
import { AnimeEstimateService } from "./services/animeEstimate.service"
import { AnimeSchema } from "../anime/schemas/anime.schema"
import { AnimeModule } from "../anime/anime.module"
import { UserAnimeService } from "./services/userAnime.service"
import { UserAnimeController } from "./controllers/userAnime.controller"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Anime", schema: AnimeSchema },
      { name: "AnimeEstimate", schema: AnimeEstimateSchema },
    ]),
    AnimeModule,
  ],
  providers: [
    UserResolver,
    UserService,
    AnimeEstimateService,
    UserAnimeService,
  ],
  controllers: [AnimeEstimateController, UserAnimeController],
  exports: [UserService],
})
class UserModule {}

export { UserModule }
