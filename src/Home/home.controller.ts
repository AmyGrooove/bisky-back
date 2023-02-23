import { Controller, Get, Put } from '@nestjs/common';

import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/seasonal')
  getSeasonal() {
    return this.homeService.getSeasonal();
  }

  @Put('/seasonal')
  updateSeasonal() {
    return this.homeService.updateSeasonal();
  }
}
