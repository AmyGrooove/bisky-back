import { Args, Query, Resolver } from "@nestjs/graphql"

import { FranchiseService } from "../services/franchise.service"
import { GeneralFranchiseQuery } from "../queries/generalFranchise.query"
import { FranchiseFullModel } from "../entities/franchiseFull.entity"
import { AnimeService } from "../../anime/services/anime.service"
import { GeneralAnimeQuery } from "../../anime/queries/generalAnime.query"

@Resolver()
class FranchiseResolver {
  constructor(
    private franchiseService: FranchiseService,
    private animeService: AnimeService,
  ) {}

  @Query(() => [FranchiseFullModel], { name: "getFranchises" })
  async getFranchises(
    @Args("franchiseQuery", {
      type: () => GeneralFranchiseQuery,
      defaultValue: { page: 1, count: 10, isPaginationOff: false },
    })
    franchiseQuery: GeneralFranchiseQuery,

    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: { page: 1, count: 10 },
    })
    animeQuery: GeneralAnimeQuery,
  ) {
    return Promise.all(
      (await this.franchiseService.getFranchises(franchiseQuery)).map(
        async (el) => {
          const relatedWorks = await this.animeService.getAnimes({
            query: {
              ...animeQuery,
              filter: {
                ...animeQuery.filter,
                franchises_ID_ONLY: [el._id.toString()],
              },
            },
          })

          return { ...el, relatedWorks: relatedWorks }
        },
      ),
    )
  }
}

export { FranchiseResolver }
