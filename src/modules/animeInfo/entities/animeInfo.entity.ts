import { Field, Float, Int, ObjectType } from "@nestjs/graphql"
import { PlatformsModel } from "src/modules/platforms/entities/platforms.entity"
import { GenresModel } from "src/modules/genres/entities/genres.entity"
import { StudiosModel } from "src/modules/studios/entities/studios.entity"
import { FranchisesModel } from "src/modules/franchises/entities/franchises.entity"
import { StatusEnum, RatingEnum, KindEnum } from "./enums"

@ObjectType({ description: "Names in different languages" })
class LabelsModel {
  @Field(() => [String])
  ru: string[]

  @Field(() => [String])
  en: string[]

  @Field(() => [String])
  others: string[]
}

@ObjectType({
  description: "Anime rating (>=7.8 - High; =>5.8 - Medium; <5.8 - Low)",
})
class ScoresModel {
  @Field(() => Float, { defaultValue: 0.0, description: "Overall rating" })
  general: number

  @Field(() => Float, {
    defaultValue: 0.0,
    description: "Arithmetic mean score for all episodes",
  })
  allEpisodes: number
}

@ObjectType({ description: "This anime is on other platforms" })
class OtherPlatformsModel {
  @Field(() => Float, { defaultValue: 0.0 })
  score: number

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Link to this anime on this platform",
  })
  url: string | null

  @Field(() => PlatformsModel)
  platform: PlatformsModel
}

@ObjectType({ description: "Information about each series separately" })
class SingleEpisode {
  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Episode title",
  })
  name: string | null

  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
    description: "Episode release date",
  })
  airedAt: Date | null

  @Field(() => Int, { defaultValue: 0, description: "Episode duration" })
  duration: number

  @Field(() => Float, { defaultValue: 0.0, description: "Episode rating" })
  score: number
}

@ObjectType({ description: "General information about anime series" })
class EpisodesModel {
  @Field(() => Int, {
    defaultValue: 0,
    description: "Number of episodes/Episodes planned",
  })
  count: number

  @Field(() => Int, {
    defaultValue: 0,
    description: "How many episodes have been released so far",
  })
  aired: number

  @Field(() => Boolean, {
    defaultValue: false,
    description: "The number of episodes is unlimited",
  })
  isUnlimitedSeries: boolean

  @Field(() => Int, {
    defaultValue: 0,
    description: "Average length of all episodes",
  })
  averageDuration: number

  @Field(() => [SingleEpisode])
  singleEpisodes: SingleEpisode[]
}

@ObjectType({ description: "Date information" })
class DatesModel {
  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
    description: "Anime release date",
  })
  airedOn: Date | null

  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
    description: "Anime release date",
  })
  releasedOn: Date | null
}

@ObjectType({ description: "Anime Data" })
class AnimeInfoModel {
  @Field(() => String)
  _id: string

  @Field(() => Int, { description: "Id of shikimori" })
  shikiId: number

  @Field(() => LabelsModel)
  labels: LabelsModel

  @Field(() => String, { nullable: true, description: "Anime cover" })
  poster: string | null

  @Field(() => KindEnum, { defaultValue: KindEnum.none })
  kind: KindEnum

  @Field(() => ScoresModel)
  scores: ScoresModel

  @Field(() => [OtherPlatformsModel])
  otherPlatforms: OtherPlatformsModel[]

  @Field(() => StatusEnum, { defaultValue: StatusEnum.anons })
  status: StatusEnum

  @Field(() => EpisodesModel)
  episodes: EpisodesModel

  @Field(() => DatesModel)
  dates: DatesModel

  @Field(() => RatingEnum, { defaultValue: RatingEnum.none })
  rating: RatingEnum

  @Field(() => String, {
    defaultValue: null,
    nullable: true,
    description: "Description of the anime",
  })
  description: string | null

  @Field(() => [String], { description: "Anime screenshots" })
  screenshots: string[]

  @Field(() => [String], {
    description:
      "Trailers, teasers, announcements and other videos related to anime",
  })
  videos: string[]

  @Field(() => [GenresModel], { description: "Genres of this anime" })
  genres: GenresModel[]

  @Field(() => [StudiosModel], {
    description: "The studios that developed this anime",
  })
  studios: StudiosModel[]

  @Field(() => FranchisesModel, {
    defaultValue: null,
    nullable: true,
    description: "Related other projects with this anime",
  })
  franchise: FranchisesModel | null

  @Field(() => Date, {
    defaultValue: new Date(),
    description: "Anime last update date",
  })
  updateDate: Date
}

export { AnimeInfoModel }
