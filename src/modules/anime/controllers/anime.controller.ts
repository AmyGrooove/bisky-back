import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { AnimeService } from "../services/anime.service"

@ApiTags("Anime")
@UseInterceptors(CacheInterceptor)
@Controller("anime")
class AnimeController {
  constructor(private animeService: AnimeService) {}

  @ApiOperation({ summary: "Get all id`s" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [String],
  })
  @Get("allIds")
  async allIds() {
    return this.animeService.getAllAnimeIds()
  }
}

export { AnimeController }
