import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeInfo, AnimeInfoSchema } from '../schems/AnimeInfo.schema';

import { AnimePageController } from './animePage.controller';
import { AnimePageService } from './animePage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnimeInfo.name, schema: AnimeInfoSchema },
    ]),
  ],
  controllers: [AnimePageController],
  providers: [AnimePageService],
})
export class AnimePageModule {}
