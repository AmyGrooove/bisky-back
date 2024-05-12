import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { FranchiseModule } from "../franchise/franchise.module"
import { GenreModule } from "../genre/genre.module"
import { PlatformModule } from "../platform/platform.module"
import { StudioModule } from "../studio/studio.module"
import { UserSchema } from "../user/schemas/user.schema"

import { AnimeSchema } from "./schemas/anime.schema"
import { AnimeController } from "./controllers/anime.controller"
import { AnimeService } from "./services/anime.service"
import { AnimeResolver } from "./resolvers/anime.resolver"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Anime", schema: AnimeSchema },
      { name: "User", schema: UserSchema },
    ]),
    forwardRef(() => StudioModule),
    forwardRef(() => FranchiseModule),
    forwardRef(() => GenreModule),
    forwardRef(() => PlatformModule),
  ],
  providers: [AnimeResolver, AnimeService],
  exports: [AnimeService],
  controllers: [AnimeController],
})
class AnimeModule {}

export { AnimeModule }
