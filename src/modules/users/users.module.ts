import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Users, UsersSchema } from "./schemas/users.schema"
import { UsersController } from "./users.controller"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
