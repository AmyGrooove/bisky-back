import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnimeModule } from "../anime/anime.module"
import { FranchiseResolver } from "./resolvers/franchise.resolver"
import { FranchiseSchema } from "./schemas/franchise.schema"
import { FranchiseService } from "./services/franchise.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Franchise", schema: FranchiseSchema }]),
    forwardRef(() => AnimeModule),
  ],
  providers: [FranchiseResolver, FranchiseService],
  exports: [FranchiseService],
})
class FranchiseModule {}

export { FranchiseModule }
