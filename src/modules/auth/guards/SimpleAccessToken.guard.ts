import { ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
class SimpleAccessTokenGuard extends AuthGuard("jwt") {
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  canActivate(context: ExecutionContext) {
    return (super.canActivate(context) as Promise<boolean>).catch(() => true)
  }
}

export { SimpleAccessTokenGuard }
