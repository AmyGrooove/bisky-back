import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  apiPage() {
    return `<h1>Bisky-back API</h1><button>Update SeasonalAnime</button</>`;
  }
}
