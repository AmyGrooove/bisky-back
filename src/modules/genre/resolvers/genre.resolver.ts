import { Args, Query, Resolver } from "@nestjs/graphql"
import { GenreService } from "../services/genre.service"
import { GeneralGenreQuery } from "../queries/generalGenre.query"
import { GenreFullModel } from "../entities/genreFull.entity"
import { ObjectId } from "mongoose"
import { AnimeService } from "../../anime/services/anime.service"
import { GeneralAnimeQuery } from "../../anime/queries/anime/generalAnime.query"

@Resolver()
class GenreResolver {
  constructor(
    private genreService: GenreService,
    private animeService: AnimeService,
  ) {}

  @Query(() => [GenreFullModel], { name: "getGenres" })
  async getGenres(
    @Args("genreQuery", {
      type: () => GeneralGenreQuery,
      defaultValue: { page: 1, count: 10 },
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
          ...animeQuery,
          filter: {
            ...animeQuery.filter,
            genres_ID: [el._id as unknown as ObjectId],
          },
        })

        return { ...el, relatedWorks: relatedWorks }
      }),
    )
  }
}

export { GenreResolver }
