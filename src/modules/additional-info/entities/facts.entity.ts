import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class FactsModel {
  @Field()
  fact: string
}
