import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeInfoService } from "./services/anime-Info.module.service"
import { AnimeInfoResolver } from "./resolvers/anime-Info.resolver"
import { AnimeInfoSchema } from "./schemas/anime-info.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "AnimeInfo", schema: AnimeInfoSchema }]),
  ],
  providers: [AnimeInfoResolver, AnimeInfoService],
})
export class AnimeInfoModule {}
