import { join } from "path"

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { ServeStaticModule } from "@nestjs/serve-static"
import { ScheduleModule } from "@nestjs/schedule"
import * as redisStore from "cache-manager-redis-store"
import { CacheModule } from "@nestjs/cache-manager"

import { AnimeModule } from "../anime/anime.module"
import { AnimeCommentModule } from "../animeComment/animeComment.module"
import { FactModule } from "../fact/fact.module"
import { FranchiseModule } from "../franchise/franchise.module"
import { GenreModule } from "../genre/genre.module"
import { PlatformModule } from "../platform/platform.module"
import { StudioModule } from "../studio/studio.module"
import { UserModule } from "../user/user.module"
import { AuthModule } from "../auth/auth.module"
import { ParseAnimeCronModule } from "../parseAnimeCron/parseAnimeCron.module"

import { AppController } from "./controllers/app.controller"

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
      introspection: true,
      context: ({ req }) => ({ req }),
      apollo: {
        graphRef: process.env.APOLLO_GRAPH_REF,
        key: process.env.APOLLO_KEY,
      },
    }),
    ServeStaticModule.forRoot({ rootPath: join(process.cwd(), "public") }),
    CacheModule.register({
      isGlobal: true,
      useFactory: () => ({ store: redisStore }),
      host: "localhost",
      port: 6379,
      ttl: 300000,
    }),
    FactModule,
    AnimeModule,
    FranchiseModule,
    GenreModule,
    PlatformModule,
    StudioModule,
    AnimeCommentModule,
    UserModule,
    AuthModule,
    ParseAnimeCronModule,
  ],
  controllers: [AppController],
})
class AppModule {}

export { AppModule }
