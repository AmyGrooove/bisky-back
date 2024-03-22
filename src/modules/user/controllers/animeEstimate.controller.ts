import {
  Controller,
  Request,
  HttpStatus,
  Patch,
  Param,
  UseGuards,
  Body,
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"
import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { ObjectId } from "mongoose"
import { AnimeEstimateService } from "../services/animeEstimate.service"
import { UpdateAnimeScoreDto } from "../dto/updateAnimeScore.dto"
import { UpdateAnimeStatusDto } from "../dto/updateAnimeStatus.dto"

@ApiTags("AnimeEstimate")
@Controller("user")
class AnimeEstimateController {
  constructor(private animeEstimateService: AnimeEstimateService) {}

  @ApiOperation({ summary: "Update anime in list" })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @Patch("/:animeId/status")
  async updateAnimeStatus(
    @Request() req,
    @Param("animeId") animeId: ObjectId,
    @Body() animeStatus: UpdateAnimeStatusDto,
  ) {
    return this.animeEstimateService.updateAnimeStatus({
      userId: req.user._id,
      animeId,
      animeStatus: animeStatus.status,
    })
  }

  @ApiOperation({ summary: "Update anime score" })
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
    @Param("animeId") animeId: ObjectId,
    @Body() animeScore: UpdateAnimeScoreDto,
  ) {
    return this.animeEstimateService.updateAnimeScore({
      userId: req.user._id,
      animeId,
      animeScore: animeScore.score,
    })
  }
}

export { AnimeEstimateController }
