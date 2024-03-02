import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { FactsResolver } from "./resolvers/facts.resolver"
import { FactsService } from "./services/facts.service"
import { FactsController } from "./controllers/facts.controller"
import { FactsSchema } from "./schemas/facts.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Facts", schema: FactsSchema }]),
  ],
  providers: [FactsResolver, FactsService],
  controllers: [FactsController],
})
class FactsModule {}

export { FactsModule }
