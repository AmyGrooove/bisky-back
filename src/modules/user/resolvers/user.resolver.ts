import { Args, Query, Resolver } from "@nestjs/graphql"
import { UserService } from "../services/user.service"
import { UserPublicFullModel } from "../entities/userPublicFull.entity"
import { Types } from "mongoose"
import { GeneralAnimeQuery } from "../../anime/queries/anime/generalAnime.query"
import { AnimeService } from "../../anime/services/anime.service"

@Resolver()
class UserResolver {
  constructor(
    private userService: UserService,
    private animeService: AnimeService,
  ) {}

  @Query(() => UserPublicFullModel, { name: "getUserPublicData" })
  async getUserPublicData(
    @Args("animeQuery", {
      type: () => GeneralAnimeQuery,
      defaultValue: { page: 1, count: 20 },
    })
    animeQuery: GeneralAnimeQuery,

    @Args("_id", { type: () => String, nullable: true, defaultValue: null })
    _id?: string,

    @Args("username", {
      type: () => String,
      nullable: true,
      defaultValue: null,
    })
    username?: string,
  ) {
    const userData = await this.userService.getUser({
      _id: _id === null ? null : new Types.ObjectId(_id),
      username,
    })
    userData.animeEstimates.filter((item) => item.base)

    const relatedAnimes = (
      await this.animeService.getAnimes({
        ...animeQuery,
        filter: {
          ...animeQuery.filter,
          _id_ID: userData.animeEstimates.map((item) => item.base),
        },
      })
    ).map((item, index) => ({
      ...userData.animeEstimates[index],
      base: item,
    }))

    return { ...userData, animeEstimates: relatedAnimes }
  }
}

export { UserResolver }
