import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserResolver } from "./resolvers/user.resolver"
import { UserSchema } from "./schemas/user.schema"
import { UserService } from "./services/user.service"
import { UserController } from "./user.controller"

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService],
})
class UserModule {}

export { UserModule }
