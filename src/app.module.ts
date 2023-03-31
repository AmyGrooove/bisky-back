import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { HomeModule } from "./Home/home.module"
import { SearchModule } from "./Search/search.module"
import { AnimePageModule } from "./AnimePage/animePage.module"

@Module({
  imports: [
    HomeModule,
    SearchModule,
    AnimePageModule,
    ConfigModule.forRoot({ envFilePath: ".env" }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
