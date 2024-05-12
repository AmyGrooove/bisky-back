import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { HttpModule } from "@nestjs/axios"

import { AnimeSchema } from "../anime/schemas/anime.schema"
import { PlatformSchema } from "../platform/schemas/platform.schema"
import { StudioSchema } from "../studio/schemas/studio.schema"
import { FranchiseSchema } from "../franchise/schemas/franchise.schema"
import { GenreSchema } from "../genre/schemas/genre.schema"

import { ParseAnimeCronService } from "./services/parseAnimeCron.service"
import { ParseAnimeSubService } from "./services/parseAnimeSub.service"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Anime", schema: AnimeSchema },
      { name: "Platform", schema: PlatformSchema },
      { name: "Studio", schema: StudioSchema },
      { name: "Franchise", schema: FranchiseSchema },
      { name: "Genre", schema: GenreSchema },
    ]),
    HttpModule,
  ],
  providers: [ParseAnimeCronService, ParseAnimeSubService],
})
class ParseAnimeCronModule {}

export { ParseAnimeCronModule }
