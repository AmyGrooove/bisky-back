import {
  Controller,
  Request,
  HttpStatus,
  Patch,
  Param,
  UseGuards,
  Body,
  Delete,
  UseInterceptors,
} from "@nestjs/common"
import {
  ApiSecurity,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { AnimeEstimateService } from "../services/animeEstimate.service"
import { UpdateAnimeScoreDto } from "../dto/updateAnimeScore.dto"
import { UpdateAnimeStatusDto } from "../dto/updateAnimeStatus.dto"
import { UpdateAnimeWatchedSeriesDto } from "../dto/updateAnimeWatchedSeriesCount.dto"
import { ClearCache } from "../../../decorators"

@ApiTags("AnimeEstimate")
@UseInterceptors(CacheInterceptor)
@Controller("user")
class AnimeEstimateController {
  constructor(private animeEstimateService: AnimeEstimateService) {}

  @ApiOperation({ summary: "Add/Update anime from the list" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCache)
  @Patch("/:animeId/status")
  async updateAnimeStatus(
    @Request() req,
    @Param("animeId") animeId: string,
    @Body() animeStatus: UpdateAnimeStatusDto,
  ) {
    return this.animeEstimateService.updateAnimeStatus({
      userId: req.user._id,
      animeId,
      animeStatus: animeStatus.status,
    })
  }

  @ApiOperation({ summary: "Update anime rating in the list" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCache)
  @Patch("/:animeId/score")
  async updateAnimeScore(
    @Request() req,
    @Param("animeId") animeId: string,
    @Body() animeScore: UpdateAnimeScoreDto,
  ) {
    return this.animeEstimateService.updateAnimeScore({
      userId: req.user._id,
      animeId,
      animeScore: animeScore.score,
    })
  }

  @ApiOperation({
    summary: "Update the number of watched anime episodes in the list",
  })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCache)
  @Patch("/:animeId/watchedSeriesCount")
  async updateAnimeWatchedSeriesCount(
    @Request() req,
    @Param("animeId") animeId: string,
    @Body() animeWatchedSeriesCount: UpdateAnimeWatchedSeriesDto,
  ) {
    return this.animeEstimateService.updateAnimeWatchedSeriesCount({
      userId: req.user._id,
      animeId,
      animeWatchedSeriesCount: animeWatchedSeriesCount.watchedSeriesCount,
    })
  }

  @ApiOperation({ summary: "Remove anime from list" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClearCache)
  @Delete("/:animeId/status")
  async deleteAnimeFromList(@Request() req, @Param("animeId") animeId: string) {
    return this.animeEstimateService.deleteAnimeFromList({
      userId: req.user._id,
      animeId,
    })
  }
}

export { AnimeEstimateController }
