import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  UseGuards,
  Request,
  Delete,
  UseInterceptors,
} from "@nestjs/common"
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { UserAnimeService } from "../services/userAnime.service"
import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { SkipListDto } from "../dto/skipList.dto"

@ApiTags("UserAnime")
@UseInterceptors(CacheInterceptor)
@Controller("user")
class UserAnimeController {
  constructor(private userAnimeService: UserAnimeService) {}

  @ApiOperation({ summary: "Add anime in skipList" })
  @ApiSecurity("AccessToken")
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean })
  @UseGuards(AccessTokenGuard)
  @Patch("/skipList")
  async skipAnime(@Request() req, @Body() animeId: SkipListDto) {
    return this.userAnimeService.skipAnime({
      userId: req.user._id,
      animeId: animeId.animeId,
    })
  }

  @ApiOperation({ summary: "Remove anime from skipList" })
  @ApiSecurity("AccessToken")
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean })
  @UseGuards(AccessTokenGuard)
  @Delete("/skipList")
  async removeFromSkipAnime(@Request() req, @Body() animeId: SkipListDto) {
    return this.userAnimeService.removeFromSkipAnime({
      userId: req.user._id,
      animeId: animeId.animeId,
    })
  }
}

export { UserAnimeController }
