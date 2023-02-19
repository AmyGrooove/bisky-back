import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SeasonalAnime,
  SeasonalAnimeSchema,
} from './schems/SeasonalAnime.schema';

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
