import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { UsersModule } from "../users/users.module"
import { AccessTokenStrategy } from "./strategy/accessToken.strategy"
import { RefreshTokenStrategy } from "./strategy/refreshToken.strategy"
import { OAuth2Strategy } from "./strategy/oauth2.strategy"

@Module({
  imports: [PassportModule, JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    // OAuth2Strategy,
  ],
})
export class AuthModule {}
