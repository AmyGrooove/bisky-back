import { Args, Context, Query, Resolver } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"

import { UserService } from "../services/user.service"
import { UserPublicFullModel } from "../entities/userPublicFull.entity"
import { GeneralAnimeQuery } from "../../anime/queries/generalAnime.query"
import { AnimeService } from "../../anime/services/anime.service"
import { SimpleAccessTokenGuard } from "../../auth/guards/simpleAccessToken.guard"
import { GeneralUserQuery } from "../queries/generalUser.query"

@Resolver()
class UserResolver {
  constructor(
    private userService: UserService,
    private animeService: AnimeService,
  ) {}

  @UseGuards(SimpleAccessTokenGuard)
  @Query(() => UserPublicFullModel, { name: "getUserPublicData" })
  async getUserPublicData(
    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: { page: 1, count: 20, isPaginationOff: false },
    })
    animeQuery: GeneralAnimeQuery,

    @Args("userQuery", {
      type: () => GeneralUserQuery,
      defaultValue: { isCurrentUser: false },
    })
    userQuery: GeneralUserQuery,

    @Context() context,
  ) {
    const userData = await this.userService.getUser(
      userQuery,
      context.req?.user?._id,
    )
    userData.animeEstimates = userData.animeEstimates.filter((item) =>
      !!item.base && !!animeQuery.filter?._id_ID
        ? animeQuery.filter._id_ID[0] === item.base._id.toString()
        : true,
    )

    const relatedAnimes = (
      await this.animeService.getAnimes({
        query: {
          ...animeQuery,
          filter: {
            ...animeQuery.filter,
            _id_ID:
              animeQuery.filter?._id_ID ??
              userData.animeEstimates.map((item) => item.base),
          },
        },
        userId: context.req?.user?._id,
      })
    ).map((item, index) => ({
      ...userData.animeEstimates[index],
      base: item,
    }))

    return { ...userData, animeEstimates: relatedAnimes }
  }
}

export { UserResolver }
