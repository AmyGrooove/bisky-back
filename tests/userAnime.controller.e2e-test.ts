import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongooseModule } from "@nestjs/mongoose"

import { AppModule } from "../src/modules/app/app.module"
import { AuthController } from "../src/modules/auth/controllers/auth.controller"
import { UserWithTokensModel } from "../src/modules/auth/entities/userWithTokens.entity"

const animeId = "6642814dc19373b1872555db"
const noAnimeId = "1642814dc19373b1872555db"

describe("UserAnime Controller (e2e)", () => {
  let app: INestApplication
  let mongoServer: MongoMemoryServer

  let user: UserWithTokensModel

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const userController = app.get(AuthController)

    user = await userController.register({
      username: "testuser",
      password: "password",
      email: "test@example.com",
    })
  })

  afterAll(async () => {
    await app.close()
    await mongoServer.stop()
  })

  // TODO: убрать
  it("skipAnime - Добавить аниме в список исключаемого", async () => {
    await request(app.getHttpServer())
      .patch(`/user/skipList`)
      .send({ animeId: animeId })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("skipAnime (ERR) - Добавить несуществующее аниме в список исключаемого", async () => {
    await request(app.getHttpServer())
      .patch(`/user/skipList`)
      .send({ animeId: noAnimeId })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("removeFromSkipAnime - Удалить аниме из списка исключаемого", async () => {
    await request(app.getHttpServer())
      .delete(`/user/skipList`)
      .send({ animeId: animeId })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("removeFromSkipAnime (ERR) - Удалить несуществующее аниме из списка исключаемого", async () => {
    await request(app.getHttpServer())
      .delete(`/user/skipList`)
      .send({ animeId: noAnimeId })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })
})
