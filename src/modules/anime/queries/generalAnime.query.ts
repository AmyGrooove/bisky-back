import { Field, InputType, Int } from "@nestjs/graphql"

import { FilterAnimeQuery } from "./filterAnime.query"
import { SortAnimeQuery } from "./sortAnime.query"
import { LimitQuantityAnimeQuery } from "./limitQuantityAnime.query"
import { UserFilterQuery } from "./userFilter.query"

@InputType({ description: "Anime arguments" })
class GeneralAnimeQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Search anime by all titles (including incorrect case)",
  })
  searchInput?: string | null

  @Field(() => FilterAnimeQuery, { nullable: true, defaultValue: null })
  filter?: FilterAnimeQuery | null

  @Field(() => FilterAnimeQuery, { nullable: true, defaultValue: null })
  filterExclude?: FilterAnimeQuery | null

  @Field(() => SortAnimeQuery, { nullable: true, defaultValue: null })
  sort?: SortAnimeQuery | null

  @Field(() => LimitQuantityAnimeQuery, { nullable: true, defaultValue: null })
  limit?: LimitQuantityAnimeQuery | null

  @Field(() => UserFilterQuery, { nullable: true })
  userFilters?: UserFilterQuery | null

  @Field(() => Boolean, {
    defaultValue: false,
    description: "Set to true if pagination is not needed (Speeds up queries)",
  })
  isPaginationOff?: boolean
}

export { GeneralAnimeQuery }
