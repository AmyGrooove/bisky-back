import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SeasonalAnime,
  SeasonalAnimeSchema,
} from '../schems/SeasonalAnime.schema';
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
