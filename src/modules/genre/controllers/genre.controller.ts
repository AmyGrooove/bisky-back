import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common"
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { GenreService } from "../services/genre.service"
import { LanguageModel } from "../../../auxiliary"

class GenreIdAndName {
  @ApiProperty()
  name: LanguageModel

  @ApiProperty()
  _id: string
}

@ApiTags("Genre")
@UseInterceptors(CacheInterceptor)
@Controller("genre")
class GenreController {
  constructor(private genreService: GenreService) {}

  @ApiOperation({ summary: "Get all id`s and names" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [GenreIdAndName],
  })
  @Get("allIdsAndNames")
  async allIdsAndNames() {
    return this.genreService.getAllGenreIdsAndNames()
  }
}

export { GenreController }
