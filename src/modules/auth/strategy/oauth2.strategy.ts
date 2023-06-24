import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"

const CLIENT_ID = "v9JID4xMXsDiO7POUiF0yqzv6yWrgkoeygtp6q2Np30"
const CLIENT_SECRET = "RnrCxxc2EJDigDitZ6fsuT9VIWGMPeLPr3Vg7jb59jc"

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, "oauth2") {
  constructor() {
    super({
      authorizationURL: `https://shikimori.me/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=https%3A%2F%2Fdev.bisky.one&response_type=code&scope=user_rates`,
      tokenURL: "https://shikimori.me/oauth/token",
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "https://dev.bisky.one",
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ): Promise<void> {
    // Здесь вы можете обработать полученные данные и выполнить проверку пользователя.
    // accessToken - токен доступа
    // refreshToken - токен обновления (если применимо)
    // profile - профиль пользователя
    // done - функция обратного вызова, которую вы должны вызвать для завершения процесса аутентификации
    // done(null, user) - успешная аутентификация
    // done(error) - ошибка аутентификации

    console.log(accessToken, 1)
    console.log(refreshToken, 2)
    console.log(profile, 3)
    console.log(done, 4)
  }

  async authorize(req: any, options: any): Promise<any> {
    // Здесь вы можете настроить параметры авторизации перед перенаправлением на провайдера.
    // options.scope - запрашиваемые области доступа
    // options.state - состояние

    console.log(req, 5)
    console.log(options, 6)

    return options
  }
}
