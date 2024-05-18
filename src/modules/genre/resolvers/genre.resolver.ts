import { Args, Query, Resolver } from "@nestjs/graphql"
import { UseInterceptors } from "@nestjs/common"

import { GenreService } from "../services/genre.service"
import { GeneralGenreQuery } from "../queries/generalGenre.query"
import { GenreFullModel } from "../entities/genreFull.entity"
import { AnimeService } from "../../anime/services/anime.service"
import { GeneralAnimeQuery } from "../../anime/queries/generalAnime.query"
import { CacheResolver } from "../../../decorators"

@Resolver()
class GenreResolver {
  constructor(
    private genreService: GenreService,
    private animeService: AnimeService,
  ) {}

  @UseInterceptors(CacheResolver)
  @Query(() => [GenreFullModel], { name: "getGenres" })
  async getGenres(
    @Args("genreQuery", {
      type: () => GeneralGenreQuery,
      defaultValue: { page: 1, count: 10, isPaginationOff: false },
    })
    genreQuery: GeneralGenreQuery,

    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: { page: 1, count: 10 },
    })
    animeQuery: GeneralAnimeQuery,
  ) {
    return Promise.all(
      (await this.genreService.getGenres(genreQuery)).map(async (el) => {
        const relatedWorks = await this.animeService.getAnimes({
          query: {
            ...animeQuery,
            filter: {
              ...animeQuery.filter,
              genres_ID_ONLY: [el._id.toString()],
            },
          },
        })

        return { ...el, relatedWorks: relatedWorks }
      }),
    )
  }
}

export { GenreResolver }
