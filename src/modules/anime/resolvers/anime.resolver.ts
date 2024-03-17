import { Args, Query, Resolver } from "@nestjs/graphql"
import { AnimeService } from "../services/anime.service"
import { GeneralAnimeQuery } from "../queries/anime/generalAnime.query"
import { FranchiseService } from "../../franchise/services/franchise.service"
import { GenreService } from "../../genre/services/genre.service"
import { PlatformService } from "../../platform/services/platform.service"
import { StudioService } from "../../studio/services/studio.service"
import { AnimeFullModel } from "../entities/anime/animeFull.entity"
import { GeneralFranchiseQuery } from "../../franchise/queries/generalFranchise.query"
import { GeneralGenreQuery } from "../../genre/queries/generalGenre.query"
import { GeneralPlatformQuery } from "../../platform/queries/generalPlatform.query"
import { GeneralStudioQuery } from "../../studio/queries/generalStudio.query"

@Resolver()
class AnimeResolver {
  constructor(
    private animeService: AnimeService,
    private franchiseService: FranchiseService,
    private genreService: GenreService,
    private platformService: PlatformService,
    private studioService: StudioService,
  ) {}

  @Query(() => [AnimeFullModel], { name: "getAnimes" })
  async getAnimes(
    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: { page: 1, count: 10 },
    })
    animeQuery: GeneralAnimeQuery,

    @Args("franchiseQuery", {
      type: () => GeneralFranchiseQuery,
      defaultValue: { page: 1, count: 100 },
    })
    franchiseQuery: GeneralFranchiseQuery,

    @Args("genreQuery", {
      type: () => GeneralGenreQuery,
      defaultValue: { page: 1, count: 100 },
    })
    genreQuery: GeneralGenreQuery,

    @Args("platformQuery", {
      type: () => GeneralPlatformQuery,
      defaultValue: { page: 1, count: 100 },
    })
    platformQuery: GeneralPlatformQuery,

    @Args("studioQuery", {
      type: () => GeneralStudioQuery,
      defaultValue: { page: 1, count: 10 },
    })
    studioQuery: GeneralStudioQuery,
  ) {
    return Promise.all(
      (await this.animeService.getAnimes(animeQuery)).map(async (el) => {
        const franchises = await this.franchiseService.getFranchises({
          ...franchiseQuery,
          filter: {
            ...franchiseQuery.filter,
            _id: [el.franchise],
          },
        })

        const genres = await this.genreService.getGenres({
          ...genreQuery,
          filter: {
            ...genreQuery.filter,
            _id: el.genres,
          },
        })

        const platforms = await this.platformService.getPlatforms({
          ...platformQuery,
          filter: {
            ...platformQuery.filter,
            _id: el.otherPlatforms.map((item) => item.platform),
          },
        })

        const studios = await this.studioService.getStudios({
          ...studioQuery,
          filter: {
            ...studioQuery.filter,
            _id: el.studios,
          },
        })

        // const relatedAnimes = await this.animeService.getAnimes({
        //   count: animeQuery.limit?.relatedCount ?? 100,
        //   page: 1,
        //   filter: { _id: el.related.map((item) => item.base) },
        // })

        return {
          ...el,
          franchise: franchises.length === 0 ? null : franchises[0],
          genres: genres,
          otherPlatforms: el.otherPlatforms.map((item, index) => ({
            url: item.url,
            platform: platforms[index],
          })),
          studios: studios,
          // related: el.related.map((item, index) => ({
          //   shikiId: item.shikiId,
          //   relation: item.relation,
          //   base: relatedAnimes[index],
          // })),
        }
      }),
    )
  }
}

export { AnimeResolver }
