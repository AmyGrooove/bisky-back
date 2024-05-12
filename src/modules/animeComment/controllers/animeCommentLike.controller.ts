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
  ApiSecurity,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

import { AccessTokenGuard } from "../../auth/guards/accessToken.guard"
import { AnimeCommentLikeService } from "../services/animeCommentLike.service"
import { UpdateAnimeCommentLikeDto } from "../dto/updateAnimeCommentLike.dto"

@ApiTags("AnimeComment")
@Controller("comment")
class AnimeCommentLikeController {
  constructor(private animeCommentLikeService: AnimeCommentLikeService) {}

  @ApiOperation({ summary: "Add/Delete/Update like on comment" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "commentId", type: String })
  @UseGuards(AccessTokenGuard)
  @Patch("/:commentId/like")
  async updateAnimeCommentLike(
    @Request() req,
    @Param("commentId") commentId: string,
    @Body() commentLike: UpdateAnimeCommentLikeDto,
  ) {
    return this.animeCommentLikeService.updateAnimeCommentLike({
      userId: req.user._id,
      commentId,
      like: commentLike.like,
    })
  }
}

export { AnimeCommentLikeController }
