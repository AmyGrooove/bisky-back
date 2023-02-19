import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './Home/home.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HomeModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/biskyDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
