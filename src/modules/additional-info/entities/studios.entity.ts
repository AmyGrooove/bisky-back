import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class StudiosModel {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  img: string | null
}
