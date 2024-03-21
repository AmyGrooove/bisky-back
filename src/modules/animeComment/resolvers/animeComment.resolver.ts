import { Args, Int, Query, Resolver } from "@nestjs/graphql"
import { ObjectId } from "mongoose"
import { AnimeCommentService } from "../services/animeComment.service"
import { AnimeCommentModel } from "../entities/animeComment.entity"
import { SortAnimeCommentQuery } from "../query/sortAnimeComment.query"

@Resolver()
class AnimeCommentResolver {
  constructor(private animeCommentService: AnimeCommentService) {}

  @Query(() => [AnimeCommentModel], { name: "getAnimeComments" })
  async getAnimeComments(
    @Args("animeId", { type: () => String })
    base: ObjectId,

    @Args("page", {
      type: () => Int,
      defaultValue: 1,
      description: "Page when paginated",
    })
    page: number,

    @Args("count", {
      type: () => Int,
      defaultValue: 10,
      description: "Number of output items",
    })
    count: number,

    @Args("sort", {
      type: () => SortAnimeCommentQuery,
      nullable: true,
      defaultValue: null,
    })
    sort: SortAnimeCommentQuery | null,
  ) {
    return this.animeCommentService.getComments({ base, page, count, sort })
  }
}

export { AnimeCommentResolver }
