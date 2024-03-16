import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeResolver } from "./resolvers/anime.resolver"
import { AnimeSchema } from "./schemas/anime/anime.schema"
import { AnimeEstimateSchema } from "./schemas/animeEstimate/animeEstimate.schema"
import { AnimeListSchema } from "./schemas/animeList/animeList.schema"
import { AnimeService } from "./services/anime.service"
import { FranchiseModule } from "../franchise/franchise.module"
import { GenreModule } from "../genre/genre.module"
import { PlatformModule } from "../platform/platform.module"
import { StudioModule } from "../studio/studio.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Anime", schema: AnimeSchema },
      { name: "AnimeEstimate", schema: AnimeEstimateSchema },
      { name: "AnimeList", schema: AnimeListSchema },
    ]),
    forwardRef(() => StudioModule),
    forwardRef(() => FranchiseModule),
    forwardRef(() => GenreModule),
    forwardRef(() => PlatformModule),
  ],
  providers: [AnimeResolver, AnimeService],
  exports: [AnimeService],
})
class AnimeModule {}

export { AnimeModule }
