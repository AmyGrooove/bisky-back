import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { FranchisesResolver } from "./resolvers/franchises.resolver"
import { FranchisesService } from "./services/franchises.service"
import { FranchisesSchema } from "./schemas/franchises.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Franchises", schema: FranchisesSchema },
    ]),
  ],
  providers: [FranchisesResolver, FranchisesService],
})
class FranchisesModule {}

export { FranchisesModule }
