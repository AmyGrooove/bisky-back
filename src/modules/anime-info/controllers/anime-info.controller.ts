import { Controller, Get, Param } from "@nestjs/common"
import { AnimeInfoService } from "../services/anime-Info.module.service"

@Controller("anime-info")
export class AnimeInfoController {
  constructor(private animeInfoService: AnimeInfoService) {}

  @Get(":id")
  checkAnime(@Param() data: { id: number }) {
    return this.animeInfoService.checkAnime(data.id)
  }
}
