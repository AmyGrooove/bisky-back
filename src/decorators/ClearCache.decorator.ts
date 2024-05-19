import {
  Injectable,
  NestInterceptor,
  Inject,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common"
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Cache } from "cache-manager"
import { Observable, tap } from "rxjs"

@Injectable()
class ClearCache implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async () => {
        await this.cacheManager.reset()
      }),
    )
  }
}

export { ClearCache }
