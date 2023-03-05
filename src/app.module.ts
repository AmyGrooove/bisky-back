import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './Auth/auth.module';
import { HomeModule } from './Home/home.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './Search/search.module';

@Module({
  imports: [
    HomeModule,
    AuthModule,
    SearchModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
