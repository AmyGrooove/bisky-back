import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeResolver } from "./resolvers/anime.resolver"
import { AnimeService } from "./services/anime.service"
import { FranchiseModule } from "../franchise/franchise.module"
import { GenreModule } from "../genre/genre.module"
import { PlatformModule } from "../platform/platform.module"
import { StudioModule } from "../studio/studio.module"
import { AnimeSchema } from "./schemas/anime.schema"
import { AnimeController } from "./controllers/anime.controller"
import { UserSchema } from "../user/schemas/user.schema"

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
