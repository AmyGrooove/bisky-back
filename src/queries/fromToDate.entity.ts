import { Field, InputType } from "@nestjs/graphql"

@InputType()
class FromToDateQuery {
  @Field(() => Date, { nullable: true, defaultValue: null })
  from: Date | null

  @Field(() => Date, { nullable: true, defaultValue: null })
  to: Date | null
}

export { FromToDateQuery }
