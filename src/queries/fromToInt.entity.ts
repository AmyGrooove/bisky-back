import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
class FromToIntQuery {
  @Field(() => Int, { nullable: true, defaultValue: null })
  from: number | null

  @Field(() => Int, { nullable: true, defaultValue: null })
  to: number | null
}

export { FromToIntQuery }
