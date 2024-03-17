import { NestFactory } from "@nestjs/core"

import { AppModule } from "./modules/app/app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { createWriteStream } from "fs"
import { get } from "http"
import { RequestMethod, ValidationPipe, VersioningType } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix("api", {
    exclude: [{ path: "/", method: RequestMethod.GET }],
  })

  const config = new DocumentBuilder()
    .setTitle("Bisky API")
    .setVersion("2.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/swagger", app, document, {
    customSiteTitle: "Bisky Swagger",
    customfavIcon: "https://bisky.one/favicon.ico",
  })

  const server = await app.listen(3000)
  server.setTimeout(60000)

  const appUrl = await app.getUrl()
  if ((process.env.IS_DEVELOPMENT ?? "false") === "true") {
    get(`${appUrl}/swagger-yaml`, (response) => {
      response.pipe(createWriteStream("public/swagger/swagger-spec.yaml"))
      console.log(
        `Swagger YAML file written to: '/public/swagger/swagger-spec.yaml'`,
      )
    })
    get(`${appUrl}/swagger/swagger-ui-bundle.js`, (response) => {
      response.pipe(createWriteStream("public/swagger/swagger-ui-bundle.js"))
      console.log(
        `Swagger UI bundle file written to: '/public/swagger/swagger-ui-bundle.js'`,
      )
    })
    get(`${appUrl}/swagger/swagger-ui-init.js`, (response) => {
      response.pipe(createWriteStream("public/swagger/swagger-ui-init.js"))
      console.log(
        `Swagger UI init file written to: '/public/swagger-ui-init.js'`,
      )
    })
    get(`${appUrl}/swagger/swagger-ui-standalone-preset.js`, (response) => {
      response.pipe(
        createWriteStream("public/swagger/swagger-ui-standalone-preset.js"),
      )
      console.log(
        `Swagger UI standalone preset file written to: '/public/swagger/swagger-ui-standalone-preset.js'`,
      )
    })
    get(`${appUrl}/swagger/swagger-ui.css`, (response) => {
      response.pipe(createWriteStream("public/swagger/swagger-ui.css"))
      console.log(
        `Swagger UI css file written to: '/public/swagger/swagger-ui.css'`,
      )
    })
  }
}

bootstrap()
