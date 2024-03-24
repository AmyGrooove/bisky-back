import {
  Controller,
  Request,
  HttpStatus,
  Patch,
  Param,
  UseGuards,
  Body,
  Delete,
  Put,
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { AnimeEstimateService } from "../services/animeEstimate.service"
import { UpdateAnimeScoreDto } from "../dto/updateAnimeScore.dto"
import { UpdateAnimeStatusDto } from "../dto/updateAnimeStatus.dto"
import { UpdateAnimeWatchedSeriesDto } from "../dto/updateAnimeWatchedSeriesCount.dto"

@ApiTags("AnimeEstimate")
@Controller("user")
class AnimeEstimateController {
  constructor(private animeEstimateService: AnimeEstimateService) {}

  @ApiOperation({ summary: "Add/update anime from the list" })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @Put("/:animeId/status")
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
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
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
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
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
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @Delete("/:animeId/status")
  async deleteAnimeFromList(@Request() req, @Param("animeId") animeId: string) {
    return this.animeEstimateService.deleteAnimeFromList({
      userId: req.user._id,
      animeId,
    })
  }
}

export { AnimeEstimateController }
