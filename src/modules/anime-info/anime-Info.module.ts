import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeInfoService } from "./services/anime-Info.module.service"
import { AnimeInfoResolver } from "./resolvers/anime-Info.resolver"
import { AnimeInfoSchema } from "./schemas/anime-info.schema"
import { AnimeInfoController } from "./controllers/anime-info.controller"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "AnimeInfo", schema: AnimeInfoSchema }]),
  ],
  providers: [AnimeInfoResolver, AnimeInfoService],
  controllers: [AnimeInfoController],
})
export class AnimeInfoModule {}
