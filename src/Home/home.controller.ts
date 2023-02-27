import { Controller, Get, Post, Body } from '@nestjs/common';

import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/seasonal')
  getSeasonal() {
    return this.homeService.getSeasonal();
  }

  @Get('/best')
  getBest() {
    return this.homeService.getBest();
  }

  @Get('/fact')
  getFact() {
    return this.homeService.getFact();
  }

  @Post('/fact')
  addFact(@Body() newFact: string) {
    return this.homeService.addFact(newFact);
  }
}
