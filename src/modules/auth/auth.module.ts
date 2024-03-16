import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { AccessTokenStrategy } from "./strategy/accessToken.strategy"
import { RefreshTokenStrategy } from "./strategy/refreshToken.strategy"
import { UserModule } from "../user/user.module"

@Module({
  imports: [PassportModule, JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
