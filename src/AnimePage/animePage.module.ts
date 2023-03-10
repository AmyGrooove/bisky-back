import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeList, AnimeListSchema } from '../schems/AnimeList.schema';

import { AnimePageController } from './animePage.controller';
import { AnimePageService } from './animePage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnimeList.name, schema: AnimeListSchema },
    ]),
  ],
  controllers: [AnimePageController],
  providers: [AnimePageService],
})
export class AnimePageModule {}
