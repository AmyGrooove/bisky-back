import { Controller, Get, Post, Body, Query } from "@nestjs/common"

import { HomeService } from "./home.service"

@Controller("home")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get("/seasonal")
  getSeasonal() {
    return this.homeService.getSeasonal()
  }

  @Get("/best")
  getBest(
    @Query("page") page: number,
    @Query("usedAnimes") usedAnimes: string,
  ) {
    return this.homeService.getBest(page, usedAnimes)
  }

  @Get("/genres/anime")
  getGenresAnime(
    @Query("genre") genre: number,
    @Query("page") page: number,
    @Query("usedAnimes") usedAnimes: string,
  ) {
    return this.homeService.getGenresAnime(genre, page, usedAnimes)
  }

  @Get("/genres/all")
  gelAllGenres() {
    return this.homeService.getAllGenres()
  }

  @Get("/fact")
  getFact() {
    return this.homeService.getFact()
  }

  @Post("/fact")
  addFact(@Body() newFact: string) {
    return this.homeService.addFact(newFact)
  }
}
