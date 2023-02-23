import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SeasonalAnime,
  SeasonalAnimeSchema,
} from 'src/schems/SeasonalAnime.schema';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeasonalAnime.name, schema: SeasonalAnimeSchema },
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
