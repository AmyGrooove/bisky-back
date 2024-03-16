import { Field, InputType, Int } from "@nestjs/graphql"
import { FilterGenreQuery } from "./filterGenre.query"

@InputType({ description: "Genre arguments" })
class GeneralGenreQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number

  @Field(() => FilterGenreQuery, { nullable: true, defaultValue: null })
  filter?: FilterGenreQuery | null
}

export { GeneralGenreQuery }
