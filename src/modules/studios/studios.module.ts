import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { StudiosResolver } from "./resolvers/studios.resolver"
import { StudiosService } from "./services/studios.service"
import { StudiosSchema } from "./schemas/studios.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Studios", schema: StudiosSchema }]),
  ],
  providers: [StudiosResolver, StudiosService],
})
class StudiosModule {}

export { StudiosModule }
