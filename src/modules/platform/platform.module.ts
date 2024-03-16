import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PlatformResolver } from "./resolvers/platform.resolver"
import { PlatformSchema } from "./schemas/platform.schema"
import { PlatformService } from "./services/platform.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Platform", schema: PlatformSchema }]),
  ],
  providers: [PlatformResolver, PlatformService],
  exports: [PlatformService],
})
class PlatformModule {}

export { PlatformModule }
