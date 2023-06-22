import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { CheckUserService } from "../checkUser.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: CheckUserService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const id = await this.authService.checkUser(username)
    const user = await this.authService.checkPassword(id, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
