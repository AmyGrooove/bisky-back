import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/seasonal')
  getSeasonal() {
    return this.homeService.getSeasonal();
  }

  @Get('/best')
  getBest(@Query('page') page: number) {
    return this.homeService.getBest(page);
  }

  @Get('/genres/anime')
  getGenresAnime(
    @Query('genre') genre: string,
    @Query('usedAnimes') usedAnimes: string,
  ) {
    return this.homeService.getGenresAnime(genre, usedAnimes);
  }

  @Get('/genres/all')
  gelAllGenres() {
    return this.homeService.getAllGenres();
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
