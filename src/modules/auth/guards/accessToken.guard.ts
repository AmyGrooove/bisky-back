import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
class AccessTokenGuard extends AuthGuard("jwt") {}

export { AccessTokenGuard }
