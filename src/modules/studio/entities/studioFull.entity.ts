import { Field, ObjectType } from "@nestjs/graphql"

import { AnimeSimpleModel } from "../../anime/entities/animeSimple.entity"

import { StudioModel } from "./studio.entity"

@ObjectType({
  description: "The studios that are developing this or that anime",
})
class StudioFullModel extends StudioModel {
  @Field(() => [AnimeSimpleModel])
  relatedWorks: AnimeSimpleModel[]
}

export { StudioFullModel }
