import { Args, Query, Resolver } from "@nestjs/graphql"
import { StudioService } from "../services/studio.service"
import { GeneralStudioQuery } from "../queries/generalStudio.query"
import { StudioFullModel } from "../entities/studioFull.entity"
import { ObjectId } from "mongoose"
import { GeneralAnimeQuery } from "../../anime/queries/anime/generalAnime.query"
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
      defaultValue: { page: 1, count: 10 },
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
          ...animeQuery,
          filter: {
            ...animeQuery.filter,
            studios_ID: [el._id as unknown as ObjectId],
          },
        })

        return { ...el, relatedWorks: relatedWorks }
      }),
    )
  }
}

export { StudioResolver }
