import { Args, Query, Resolver } from "@nestjs/graphql"
import { StudioService } from "../services/studio.service"
import { GeneralStudioQuery } from "../queries/generalStudio.query"
import { StudioFullModel } from "../entities/studioFull.entity"
import { GeneralAnimeQuery } from "../../anime/queries/generalAnime.query"
import { AnimeService } from "../../anime/services/anime.service"

@Resolver()
class StudioResolver {
  constructor(
    private studioService: StudioService,
    private animeService: AnimeService,
  ) {}

  @Query(() => [StudioFullModel], { name: "getStudios" })
  async getStudios(
    @Args("studioQuery", {
      type: () => GeneralStudioQuery,
      defaultValue: { page: 1, count: 10, isPaginationOff: false },
    })
    studioQuery: GeneralStudioQuery,

    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: { page: 1, count: 10 },
    })
    animeQuery: GeneralAnimeQuery,
  ) {
    return Promise.all(
      (await this.studioService.getStudios(studioQuery)).map(async (el) => {
        const relatedWorks = await this.animeService.getAnimes({
          query: {
            ...animeQuery,
            filter: {
              ...animeQuery.filter,
              studios_ID_ONLY: [el._id.toString()],
            },
          },
        })

        return { ...el, relatedWorks: relatedWorks }
      }),
    )
  }
}

export { StudioResolver }
