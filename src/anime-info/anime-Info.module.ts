import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AnimeInfoSchema } from "./schema/anime-info.schema"
import { AnimeInfoService } from "./anime-Info.service"
import { AnimeInfoResolver } from "./anime-info.resolver"
import { GenresSchema } from "./schema/genres.schema"
import { StudiosSchema } from "src/schems/Studios.schema"

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
