import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserResolver } from "./resolvers/user.resolver"
import { UserSchema } from "./schemas/user.schema"
import { UserService } from "./services/user.service"
import { AnimeEstimateSchema } from "./schemas/animeEstimate.schema"
import { AnimeEstimateController } from "./controllers/animeEstimate.controller"
import { AnimeEstimateService } from "./services/animeEstimate.service"
import { AnimeSchema } from "../anime/schemas/anime.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Anime", schema: AnimeSchema },
      { name: "AnimeEstimate", schema: AnimeEstimateSchema },
    ]),
  ],
  providers: [UserResolver, UserService, AnimeEstimateService],
  controllers: [AnimeEstimateController],
  exports: [UserService],
})
class UserModule {}

export { UserModule }
