import { NestFactory } from "@nestjs/core"

import { AppModule } from "./modules/app/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
  await app.listen(3000)
}

bootstrap()
