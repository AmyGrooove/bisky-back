import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"

import { AnimeInfoModule } from "./anime-info/anime-Info.module"
import { join } from "path"
import { ServeStaticModule } from "@nestjs/serve-static"

@Module({
  imports: [
    AnimeInfoModule,
    ConfigModule.forRoot({ envFilePath: ".env" }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, "..", "public/schema.gql"),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
  ],
})
export class AppModule {}
