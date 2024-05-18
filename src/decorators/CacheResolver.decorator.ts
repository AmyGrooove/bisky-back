import {
  Injectable,
  NestInterceptor,
  Inject,
  ExecutionContext,
  CallHandler,
  Optional,
} from "@nestjs/common"
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Cache } from "cache-manager"
import { Observable, tap } from "rxjs"
import { GqlExecutionContext } from "@nestjs/graphql"

@Injectable()
class CacheResolver implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Optional() private readonly ttl = 300000,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const args = context.getArgs()
    const functionName = context.getHandler().name
    const ctx = GqlExecutionContext.create(context).getContext()
    const authorizationHeader = ctx.req
      ? ctx.req.headers["authorization"] || ""
      : ""

    const key = `${functionName}-${JSON.stringify(
      args[1],
    )}-${authorizationHeader}`

    const cachedValue = await this.cacheManager.get(key)
    if (cachedValue)
      return new Observable((observer) => {
        observer.next(cachedValue)
        observer.complete()
      })

    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheManager.set(key, data, this.ttl)
      }),
    )
  }
}

export { CacheResolver }
