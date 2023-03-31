import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AnimeInfo, AnimeInfoSchema } from "../schems/AnimeInfo.schema"

import { SearchController } from "./search.controller"
import { SearchService } from "./search.service"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnimeInfo.name, schema: AnimeInfoSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
