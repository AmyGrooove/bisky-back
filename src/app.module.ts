import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './Home/home.module';

@Module({
  imports: [HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
