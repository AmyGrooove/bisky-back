import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
class FavoriteAnimesQuery {
  @Field(() => Int, { defaultValue: 1, description: "Page when paginated" })
  page?: number

  @Field(() => Int, { defaultValue: 10, description: "Number of output items" })
  count?: number
}

@InputType()
class FavoriteQuery {
  @Field(() => FavoriteAnimesQuery, { nullable: true, defaultValue: null })
  animesQuery: FavoriteAnimesQuery | null
}

export { FavoriteQuery }
