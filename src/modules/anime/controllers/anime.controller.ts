import { Controller, Get, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { AnimeService } from "../services/anime.service"

@ApiTags("Anime")
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
  async whoami() {
    return this.animeService.getAllAnimeIds()
  }
}

export { AnimeController }
