import { Controller, Get, Query } from "@nestjs/common"

import { AnimePageService } from "./animePage.service"

@Controller("animePage")
export class AnimePageController {
  constructor(private readonly animePageService: AnimePageService) {}

  @Get("/")
  getAnimeInfo(@Query("shiki_id") shiki_id: number) {
    return this.animePageService.getAnimeInfo(Number(shiki_id || 0))
  }

  @Get("/all")
  getAllIds() {
    return this.animePageService.getAllIds()
  }
}
