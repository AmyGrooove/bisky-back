import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { GenresResolver } from "./resolvers/genres.resolver"
import { GenresSchema } from "./schemas/genres.schema"
import { GenresService } from "./services/genres.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Genres", schema: GenresSchema }]),
  ],
  providers: [GenresResolver, GenresService],
})
class GenresModule {}

export { GenresModule }
