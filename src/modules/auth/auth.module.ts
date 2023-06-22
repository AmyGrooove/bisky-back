import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { JwtStrategy } from "./strategy/jwt.strategy"
import { MongooseModule } from "@nestjs/mongoose"
import { Users, UsersSchema } from "./schemas/users.schema"
import { LocalStrategy } from "./strategy/local.strategy"
import { CheckUserService } from "./checkUser.service"
import { jwtConstants } from "./constants"

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [AuthService, CheckUserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
