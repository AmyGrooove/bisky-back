import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeInfoSchema } from "./schemas/animeInfo.schema"
import { AnimeInfoResolver } from "./resolvers/animeInfo.resolver"
import { AnimeInfoService } from "./services/animeInfo.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "AnimeInfo", schema: AnimeInfoSchema }]),
  ],
  providers: [AnimeInfoResolver, AnimeInfoService],
})
export class AnimeInfoModule {}
