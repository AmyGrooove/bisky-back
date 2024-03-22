import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
class RefreshTokenGuard extends AuthGuard("jwt-refresh") {}

export { RefreshTokenGuard }
