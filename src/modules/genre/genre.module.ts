import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AnimeModule } from "../anime/anime.module"

import { GenreResolver } from "./resolvers/genre.resolver"
import { GenreSchema } from "./schemas/genre.schema"
import { GenreService } from "./services/genre.service"
import { GenreController } from "./controllers/genre.controller"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Genre", schema: GenreSchema }]),
    forwardRef(() => AnimeModule),
  ],
  providers: [GenreResolver, GenreService],
  controllers: [GenreController],
  exports: [GenreService],
})
class GenreModule {}

export { GenreModule }
