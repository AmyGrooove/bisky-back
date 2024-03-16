import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeModule } from "../anime/anime.module"
import { StudioResolver } from "./resolvers/studio.resolver"
import { StudioSchema } from "./schemas/studio.schema"
import { StudioService } from "./services/studio.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Studio", schema: StudioSchema }]),
    forwardRef(() => AnimeModule),
  ],
  providers: [StudioResolver, StudioService],
  exports: [StudioService],
})
class StudioModule {}

export { StudioModule }
