import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { join } from "path"
import { PlatformsModule } from "../platforms/platforms.module"
import { AnimeInfoModule } from "../animeInfo/animeInfo.module"
import { GenresModule } from "../genres/platforms.module"
import { FactsModule } from "../facts/facts.module"
import { StudiosModule } from "../studios/studios.module"
import { FranchisesModule } from "../franchises/franchises.module"
import { AppController } from "./controllers/app.controller"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PlatformsModule,
    GenresModule,
    AnimeInfoModule,
    FactsModule,
    StudiosModule,
    FranchisesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
