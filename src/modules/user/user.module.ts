import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserResolver } from "./resolvers/user.resolver"
import { UserSchema } from "./schemas/user.schema"
import { UserService } from "./services/user.service"
import { AnimeEstimateSchema } from "./schemas/animeEstimate.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "AnimeEstimate", schema: AnimeEstimateSchema },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
class UserModule {}

export { UserModule }
