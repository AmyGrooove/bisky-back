import { ObjectType, Field, Int } from "@nestjs/graphql"
import { Language } from "./additional.entity"

@ObjectType()
class LinkGenres {
  @Field(() => Int, { nullable: true })
  anime: number | null

  @Field(() => Int)
  manga: number
}

@ObjectType()
export class GenresModel {
  @Field(() => LinkGenres)
  linkId: {
    anime: number | null
    manga: number
  }

  @Field(() => Language)
  name: { en: string; ru: string }

  @Field(() => Boolean)
  hentai: boolean
}
