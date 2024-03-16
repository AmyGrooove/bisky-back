import { Field, ObjectType } from "@nestjs/graphql"
import { StudioModel } from "./studio.entity"
import { AnimeSimpleModel } from "../../anime/entities/anime/animeSimple.entity"

@ObjectType({
  description: "The studios that are developing this or that anime",
})
class StudioFullModel extends StudioModel {
  @Field(() => [AnimeSimpleModel])
  relatedWorks: AnimeSimpleModel[]
}

export { StudioFullModel }
