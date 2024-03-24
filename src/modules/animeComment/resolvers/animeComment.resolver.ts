import { Args, Int, Query, Resolver } from "@nestjs/graphql"
import { AnimeCommentService } from "../services/animeComment.service"
import { AnimeCommentModel } from "../entities/animeComment.entity"
import { SortAnimeCommentQuery } from "../query/sortAnimeComment.query"

@Resolver()
class AnimeCommentResolver {
  constructor(private animeCommentService: AnimeCommentService) {}

  @Query(() => [AnimeCommentModel], { name: "getAnimeComments" })
  async getAnimeComments(
    @Args("animeId", { type: () => String, description: "Anime _id" })
    animeId: string,

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
    return this.animeCommentService.getComments({ animeId, page, count, sort })
  }
}

export { AnimeCommentResolver }
