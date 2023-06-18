import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeInfoService } from "./anime-info.service"
import { AnimeInfoResolver } from "./anime-info.resolver"
import { AnimeInfoSchema } from "./schema/anime-info.schema"
import { GenresSchema } from "./schema/genres.schema"
import { StudiosSchema } from "./schema/studios.schema"

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
