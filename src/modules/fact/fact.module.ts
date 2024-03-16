import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { FactController } from "./controllers/fact.controller"
import { FactResolver } from "./resolvers/fact.resolver"
import { FactSchema } from "./schemas/fact.schema"
import { FactService } from "./services/fact.service"

@Module({
  imports: [MongooseModule.forFeature([{ name: "Fact", schema: FactSchema }])],
  providers: [FactResolver, FactService],
  controllers: [FactController],
})
class FactModule {}

export { FactModule }
