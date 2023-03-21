import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimeInfo, AnimeInfoSchema } from '../schems/AnimeInfo.schema';
import { Facts, FactsSchema } from '../schems/Facts.schema';
import { Genres, GenresSchema } from '../schems/Genres.schema';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnimeInfo.name, schema: AnimeInfoSchema },
      { name: Genres.name, schema: GenresSchema },
      { name: Facts.name, schema: FactsSchema },
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
