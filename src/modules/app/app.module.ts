import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { MongooseModule } from "@nestjs/mongoose"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { AppController } from "./controllers/app.controller"
import { AnimeModule } from "../anime/anime.module"
import { AnimeCommentModule } from "../animeComment/animeComment.module"
import { FactModule } from "../fact/fact.module"
import { FranchiseModule } from "../franchise/franchise.module"
import { GenreModule } from "../genre/genre.module"
import { PlatformModule } from "../platform/platform.module"
import { StudioModule } from "../studio/studio.module"
import { UserModule } from "../user/user.module"
import { AuthModule } from "../auth/auth.module"
import { join } from "path"
import { ServeStaticModule } from "@nestjs/serve-static"

@Module({
  imports: [
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
    }),
    ServeStaticModule.forRoot({ rootPath: join(process.cwd(), "public") }),
    FactModule,
    AnimeModule,
    FranchiseModule,
    GenreModule,
    PlatformModule,
    StudioModule,
    AnimeCommentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
