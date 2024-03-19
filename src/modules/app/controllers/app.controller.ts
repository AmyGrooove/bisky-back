import { Controller, Get } from "@nestjs/common"
import { ApiExcludeEndpoint } from "@nestjs/swagger"

const backgrounds = [
  "https://drive.google.com/thumbnail?id=1-RZ-_-bDV-jFfS_nj-hP1X0XroDO840x&sz=w1024",
  "https://drive.google.com/thumbnail?id=1-y4eh_kxf-h2KTKS1jz_XC-YhyHF_CRL&sz=w1024",
  "https://drive.google.com/thumbnail?id=10_n5y0ZmjFzHausePMm-jtlIjtLhv84x&sz=w1024",
  "https://drive.google.com/thumbnail?id=15t_94kxEeJQMODTQtsrBXVxnbVnEEpF7&sz=w1024",
  "https://drive.google.com/thumbnail?id=15vrSIkXegkZoZjCur9413hUNquRiNEsM&sz=w1024",
  "https://drive.google.com/thumbnail?id=17vCHrMugaZIsbf_I2Nu1eZZIDiJIVZd6&sz=w1024",
  "https://drive.google.com/thumbnail?id=18EYViYb-fU7JWRx31ZKzk9GwqptwAoZz&sz=w1024",
  "https://drive.google.com/thumbnail?id=18o9ulHjK-wp0f0_E52daTOclxW5KEo8q&sz=w1024",
  "https://drive.google.com/thumbnail?id=1ACNQpqfvw8B58jvlZL5OM-R8_LucwYs4&sz=w1024",
  "https://drive.google.com/thumbnail?id=1AN54ahIwii8E1XFpGQtD1mMbtuoAVmUo&sz=w1024",
  "https://drive.google.com/thumbnail?id=1B8r9flS2oYo-gQOo3KuLOnME9U6flnnY&sz=w1024",
  "https://drive.google.com/thumbnail?id=1HeIK4CfV8-fv_9gswr7G-0ZekNu6kYQh&sz=w1024",
  "https://drive.google.com/thumbnail?id=1IahDzNXK8vQWDIl8xNElSc83uK9U5u5n&sz=w1024",
  "https://drive.google.com/thumbnail?id=1J-02phsJz7Krqhhd8lqaHtGmbL9dUKUo&sz=w1024",
  "https://drive.google.com/thumbnail?id=1Lb5qj9oxu9XgaN33zYCNTjhIY-3iYcVU&sz=w1024",
  "https://drive.google.com/thumbnail?id=1W15V9-WjgHdNOzBFQzAHtQ4RMTI4gUaR&sz=w1024",
  "https://drive.google.com/thumbnail?id=1ZPfq--3NJgQOZi9Ot1wGCztLga5GDiZm&sz=w1024",
  "https://drive.google.com/thumbnail?id=1aqrdg1ibmnIvk3zMZIaGRfKXPpCO1n-b&sz=w1024",
  "https://drive.google.com/thumbnail?id=1awR49_dAe-Sl4Ruv0erq5nSqPIlQk-uP&sz=w1024",
  "https://drive.google.com/thumbnail?id=1bsHnXGsbwsY_LasP8vOqLcFyE9zrw8zV&sz=w1024",
  "https://drive.google.com/thumbnail?id=1c_jwWRYMIT0sT6fraHA8dvJVegPmtIjQ&sz=w1024",
  "https://drive.google.com/thumbnail?id=1exb255ju6h63LqK3wHxa3aepYED_ZXtN&sz=w1024",
  "https://drive.google.com/thumbnail?id=1fCFOWH7BEKUnKdbWReOIKSmIOkxtjCqd&sz=w1024",
  "https://drive.google.com/thumbnail?id=1fVrr_MX1pLVvdMNKGrAxrLYWl8aTKC-3&sz=w1024",
  "https://drive.google.com/thumbnail?id=1gxTfHXXM5Am25nHR7L1B5pdSDLvdt9NB&sz=w1024",
  "https://drive.google.com/thumbnail?id=1in2YhIZQLyTJSry6i-sOwCdn1b1B5arI&sz=w1024",
  "https://drive.google.com/thumbnail?id=1lfKG1zuGCkHOiSxTAeijFxAfi2A6Aou9&sz=w1024",
  "https://drive.google.com/thumbnail?id=1n3mDk4Pf3p9j1pwjDTQM74cw9VIADQsE&sz=w1024",
  "https://drive.google.com/thumbnail?id=1to9A7G0yEK90OWms4THo923_0IL91kx1&sz=w1024",
  "https://drive.google.com/thumbnail?id=1v8-r5PiZiyg9GBEXtI691Z3gMGUEorDr&sz=w1024",
  "https://drive.google.com/thumbnail?id=1xD0KIMCmybW680d5nPAd_hR-ToyNLrVz&sz=w1024",
]

@Controller("")
class AppController {
  constructor() {}

  @ApiExcludeEndpoint(true)
  @Get("/")
  getOneRandomFact() {
    return `<div style="background-color: #231726; inset: 0; position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center">
              <img src="${
                backgrounds[Math.floor(Math.random() * backgrounds.length)]
              }" alt="" style="border-radius: 20px; width: 1024px; height: 576px; border-radius: 20px; position: relative; background-color: #301f34"/>
              <div style="display: flex; gap: 160px; margin-top: 24px;">
                <a style="font-size: 48px; padding: 8px 12px; background-color: #731750; color: #DD5480; border-radius: 8px;" href="/graphql">GraphQL</a>
                <a style="font-size: 48px; padding: 8px 12px; background-color: #731750; color: #DD5480; border-radius: 8px;" href="/swagger">Swagger</a>
              </div>
            </div>`
  }
}

export { AppController }
