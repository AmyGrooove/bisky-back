import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PlatformsResolver } from "./resolvers/platforms.resolver"
import { PlatformsSchema } from "./schemas/platforms.schema"
import { PlatformsService } from "./services/platforms.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Platforms", schema: PlatformsSchema }]),
  ],
  providers: [PlatformsResolver, PlatformsService],
})
class PlatformsModule {}

export { PlatformsModule }
