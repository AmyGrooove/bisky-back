import { Args, Context, Query, Resolver } from "@nestjs/graphql"
import { UseGuards, UseInterceptors } from "@nestjs/common"

import { AnimeService } from "../services/anime.service"
import { FranchiseService } from "../../franchise/services/franchise.service"
import { GenreService } from "../../genre/services/genre.service"
import { PlatformService } from "../../platform/services/platform.service"
import { StudioService } from "../../studio/services/studio.service"
import { AnimeFullModel } from "../entities/animeFull.entity"
import { GeneralFranchiseQuery } from "../../franchise/queries/generalFranchise.query"
import { GeneralGenreQuery } from "../../genre/queries/generalGenre.query"
import { GeneralPlatformQuery } from "../../platform/queries/generalPlatform.query"
import { GeneralStudioQuery } from "../../studio/queries/generalStudio.query"
import { SimpleAccessTokenGuard } from "../../auth/guards/simpleAccessToken.guard"
import { GeneralAnimeQuery } from "../queries/generalAnime.query"
import { CacheResolver } from "../../../decorators"

@Resolver()
class AnimeResolver {
  constructor(
    private animeService: AnimeService,
    private franchiseService: FranchiseService,
    private genreService: GenreService,
    private platformService: PlatformService,
    private studioService: StudioService,
  ) {}

  @UseGuards(SimpleAccessTokenGuard)
  @UseInterceptors(CacheResolver)
  @Query(() => [AnimeFullModel], { name: "getAnimes" })
  async getAnimes(
    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: {
        page: 1,
        count: 10,
        isPaginationOff: false,
        userFilters: {},
      },
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

    @Args("isWithoutRelations", { type: () => Boolean, defaultValue: true })
    isWithoutRelations = true,

    @Context() context,
  ) {
    return Promise.all(
      (
        await this.animeService.getAnimes({
          query: animeQuery,
          userId: context.req?.user?._id,
        })
      ).map(async (el) => {
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

        const relatedAnimes = isWithoutRelations
          ? []
          : await this.animeService.getAnimes({
              query: {
                count: animeQuery.limit?.relatedCount ?? 100,
                page: 1,
                filter: {
                  _id_ID: el.related
                    .map((item) => item.base)
                    .filter((item) => item),
                },
                isPaginationOff: true,
              },
            })

        return {
          ...el,
          franchise: franchises.length === 0 ? null : franchises[0],
          genres: genres,
          otherPlatforms: el.otherPlatforms.map((item, index) => ({
            url: item.url,
            platform: platforms[index],
          })),
          studios: studios,
          related: el.related
            .map((item, index) => ({
              shikiId: item.shikiId,
              relation: item.relation,
              base: relatedAnimes[index],
            }))
            .filter((item) => item.base),
        }
      }),
    )
  }
}

export { AnimeResolver }
