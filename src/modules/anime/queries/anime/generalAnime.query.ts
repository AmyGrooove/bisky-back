import { Field, InputType, Int } from "@nestjs/graphql"
import { FilterAnimeQuery } from "./filterAnime.query"
import { SortAnimeQuery } from "./sortAnime.query"
import { LimitQuantityAnimeQuery } from "./limitQuantityAnime.query"

@InputType({ description: "Anime arguments" })
class GeneralAnimeQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number

  @Field(() => FilterAnimeQuery, {
    nullable: true,
    defaultValue: null,
  })
  filter?: FilterAnimeQuery | null

  @Field(() => SortAnimeQuery, {
    nullable: true,
    defaultValue: null,
  })
  sort?: SortAnimeQuery | null

  @Field(() => LimitQuantityAnimeQuery, {
    nullable: true,
    defaultValue: null,
  })
  limit?: LimitQuantityAnimeQuery | null
}

export { GeneralAnimeQuery }