import { Field, Float, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
class ScoreModel {
  @Field(() => Float, { defaultValue: 0.0 })
  averageScore: number

  @Field(() => Int, { defaultValue: 0 })
  count: number
}

export { ScoreModel }
