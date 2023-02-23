import { Module } from '@nestjs/common';
import { ShikiController } from './shiki.controller';
import { ShikiService } from './shiki.service';
import { AnimeList, AnimeListSchema } from '../schems/AnimeList.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnimeList.name, schema: AnimeListSchema },
    ]),
  ],
  controllers: [ShikiController],
  providers: [ShikiService],
})
export class ShikiModule {}
