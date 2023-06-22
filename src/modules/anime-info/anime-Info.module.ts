import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeInfoService } from "./services/get-data.service"
import { AnimeInfoResolver } from "./resolvers/get-data.resolver"
import { AnimeInfoSchema } from "./schemas/anime-info.schema"
import { GenresSchema } from "./schemas/genres.schema"
import { StudiosSchema } from "./schemas/studios.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "AnimeInfo", schema: AnimeInfoSchema },
      { name: "Genres", schema: GenresSchema },
      { name: "Studios", schema: StudiosSchema },
    ]),
  ],
  providers: [AnimeInfoResolver, AnimeInfoService],
})
export class AnimeInfoModule {}
