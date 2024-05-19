import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { AnimeService } from "../services/anime.service"
import { IdAndUpdateDateModel } from "../entities/idAndUpdateDate.entity"

@ApiTags("Anime")
@UseInterceptors(CacheInterceptor)
@Controller("anime")
class AnimeController {
  constructor(private animeService: AnimeService) {}

  @ApiOperation({ summary: "Get all id`s and update times" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [IdAndUpdateDateModel],
  })
  @Get("allIdsAndUpdateDate")
  async allIdsAndUpdateDate() {
    return this.animeService.getAllAnimeIdsAndUpdateDate()
  }
}

export { AnimeController }
