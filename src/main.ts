import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { NestFactory } from "@nestjs/core"
import { RequestMethod, ValidationPipe, VersioningType } from "@nestjs/common"

import { AppModule } from "./modules/app/app.module"

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
    .setVersion("1.2.0")
    .addSecurity("AccessToken", { type: "http", scheme: "bearer" })
    .addSecurity("RefreshToken", { type: "http", scheme: "bearer" })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/swagger", app, document, {
    customSiteTitle: "Bisky Swagger",
    customfavIcon: "https://bisky.one/favicon.ico",
  })

  const server = await app.listen(3000)
  server.setTimeout(60000)
}

bootstrap()
