import { Resolver } from "@nestjs/graphql"
import { AnimeCommentService } from "../services/animeComment.service"

@Resolver()
class AnimeCommentResolver {
  constructor(private animeCommentService: AnimeCommentService) {}
}

export { AnimeCommentResolver }
