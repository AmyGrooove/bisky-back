import { Field, InputType } from "@nestjs/graphql"

import { EListStatus } from "../../../auxiliary"

import { FilterUserQuery } from "./filterUser.query"
import { FavoriteQuery } from "./favoriteAnimes.query"

@InputType({
  description:
    "User arguments (If you pass an access-token, it will return the anime of a specific user) ",
})
class GeneralUserQuery {
  @Field(() => FavoriteQuery, {
    defaultValue: { animesQuery: { page: 1, count: 20 } },
  })
  favorites?: FavoriteQuery

  @Field(() => FilterUserQuery, { nullable: true, defaultValue: null })
  filter?: FilterUserQuery | null

  @Field(() => EListStatus, { nullable: true, defaultValue: null })
  animeListStatus?: EListStatus | null
}

export { GeneralUserQuery }
