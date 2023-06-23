import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AdditionalInfoResolver } from "./resolvers/additional-info.resolver"
import { GenresSchema } from "./schemas/genres.schema"
import { StudiosSchema } from "./schemas/studios.schema"
import { AdditionalInfoService } from "./services/additional-info.service"
import { FactsSchema } from "./schemas/facts.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Facts", schema: FactsSchema },
      { name: "Genres", schema: GenresSchema },
      { name: "Studios", schema: StudiosSchema },
    ]),
  ],
  providers: [AdditionalInfoResolver, AdditionalInfoService],
})
export class AdditionalInfoModule {}
