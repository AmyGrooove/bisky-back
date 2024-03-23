import { LanguageModel } from "../../../auxiliary"
import { Field, Int, ObjectType } from "@nestjs/graphql"
import { LabelsModel } from "./additional/labels.entity"
import { EKind } from "../../../auxiliary/enums/kind.entity"
import { EStatus } from "../../../auxiliary/enums/status.entity"
import { EpisodesModel } from "./additional/episodes.entity"
import { DatesModel } from "./additional/dates.entity"
import { ERating } from "../../../auxiliary/enums/rating.entity"
import { VideModel } from "./additional/video.entity"
import { UserListModel } from "./additional/userList.entity"
import { ObjectId } from "mongoose"
import { AnimeUserDataModel } from "./additional/animeUserData.entity"
import { UserScoresModel } from "./additional/userScores.entite"

@ObjectType({ description: "Anime Data" })
class AnimeModel {
  @Field(() => String)
  _id: ObjectId

  @Field(() => Int)
  shikiId: number

  @Field(() => LabelsModel)
  labels: LabelsModel

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: "Anime cover",
  })
  poster: string | null

  @Field(() => EKind, { defaultValue: EKind.none })
  kind: EKind

  @Field(() => EStatus, { defaultValue: EStatus.anons })
  status: EStatus

  @Field(() => EpisodesModel)
  episodes: EpisodesModel

  @Field(() => DatesModel)
  dates: DatesModel

  @Field(() => ERating, { defaultValue: ERating.none })
  rating: ERating

  @Field(() => LanguageModel, { description: "Description of the anime" })
  description: LanguageModel

  @Field(() => [String], { description: "Anime screenshots" })
  screenshots: string[]

  @Field(() => [VideModel], {
    description:
      "Trailers, teasers, announcements and other videos related to anime",
  })
  videos: VideModel[]

  @Field(() => Date, { description: "Anime last update date" })
  updateDate: Date

  @Field(() => UserListModel)
  usersList: UserListModel

  @Field(() => UserScoresModel)
  score: UserScoresModel

  @Field(() => AnimeUserDataModel)
  userData: AnimeUserDataModel
}

export { AnimeModel }
