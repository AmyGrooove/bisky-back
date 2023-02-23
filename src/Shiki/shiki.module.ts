import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeList, AnimeListSchema } from 'src/schems/AnimeList.schema';

import { ShikiController } from './shiki.controller';
import { ShikiService } from './shiki.service';

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
