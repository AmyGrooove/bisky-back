import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

import { UserModule } from "../user/user.module"

import { AuthService } from "./services/auth.service"
import { AccessTokenStrategy } from "./strategy/accessToken.strategy"
import { RefreshTokenStrategy } from "./strategy/refreshToken.strategy"
import { AuthController } from "./controllers/auth.controller"
import { OAuth2Controller } from "./controllers/oauth2.controller"
import { GoogleStrategy } from "./strategy/google.strategy"

@Module({
  imports: [PassportModule, JwtModule.register({}), UserModule],
  controllers: [AuthController, OAuth2Controller],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
  ],
})
class AuthModule {}

export { AuthModule }
