import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AnimeInfoSchema } from "./schema/anime-info.schema"
import { AnimeInfoService } from "./anime-Info.service"
import { AnimeInfoResolver } from "./anime-info.resolver"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "AnimeInfo", schema: AnimeInfoSchema }]),
  ],
  providers: [AnimeInfoResolver, AnimeInfoService],
})
export class AnimeInfoModule {}
