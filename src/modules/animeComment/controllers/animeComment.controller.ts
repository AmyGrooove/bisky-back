import {
  Controller,
  Request,
  HttpStatus,
  Patch,
  Param,
  UseGuards,
  Body,
  Put,
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
import { AnimeCommentService } from "../services/animeComment.service"
import { UpdateAnimeCommentDto } from "../dto/updateAnimeComment.dto"

@ApiTags("AnimeComment")
@UseInterceptors(CacheInterceptor)
@Controller("comment")
class AnimeCommentController {
  constructor(private animeCommentService: AnimeCommentService) {}

  @ApiOperation({ summary: "Add a comment to the anime" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "animeId", type: String })
  @UseGuards(AccessTokenGuard)
  @Put(":animeId/add")
  async addAnimeComment(
    @Request() req,
    @Param("animeId") animeId: string,
    @Body() commentText: UpdateAnimeCommentDto,
  ) {
    return this.animeCommentService.addAnimeComment({
      userId: req.user._id,
      animeId,
      text: commentText.text,
    })
  }

  @ApiOperation({ summary: "Update comment" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "commentId", type: String })
  @UseGuards(AccessTokenGuard)
  @Patch(":commentId")
  async updateAnimeComment(
    @Request() req,
    @Param("commentId") commentId: string,
    @Body() commentText: UpdateAnimeCommentDto,
  ) {
    return this.animeCommentService.updateAnimeComment({
      userId: req.user._id,
      commentId,
      text: commentText.text,
    })
  }

  @ApiOperation({ summary: "Delete comment" })
  @ApiSecurity("AccessToken")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: Boolean,
  })
  @ApiParam({ name: "commentId", type: String })
  @UseGuards(AccessTokenGuard)
  @Delete(":commentId")
  async deleteAnimeComment(
    @Request() req,
    @Param("commentId") commentId: string,
  ) {
    return this.animeCommentService.deleteAnimeComment({
      userId: req.user._id,
      commentId,
    })
  }
}

export { AnimeCommentController }
