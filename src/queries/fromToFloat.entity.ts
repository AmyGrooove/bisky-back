import { Field, Float, InputType } from "@nestjs/graphql"

@InputType()
class FromToFloatQuery {
  @Field(() => Float, { nullable: true, defaultValue: null })
  from: number | null

  @Field(() => Float, { nullable: true, defaultValue: null })
  to: number | null
}

export { FromToFloatQuery }
