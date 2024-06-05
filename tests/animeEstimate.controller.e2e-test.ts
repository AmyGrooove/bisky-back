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

describe("AnimeEstimate Controller (e2e)", () => {
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
  it("updateAnimeStatus - Добавить аниме в список", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeStatus - Обновить статус аниме в списке", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "watching" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeStatus - Удалить аниме из списка", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .delete(`/user/${animeId}/status`)
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeStatus (ERR) - Добавить несуществующее аниме в список", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${noAnimeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeScore - Поставить оценку у аниме", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${animeId}/score`)
      .send({ score: 10 })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeScore - Поменять оценку у аниме", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${animeId}/score`)
      .send({ score: 10 })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${animeId}/score`)
      .send({ score: 8 })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeScore - Удалить оценку у аниме", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${animeId}/score`)
      .send({ score: 10 })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${animeId}/score`)
      .send({ score: null })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeScore (ERR) - Поставить оценку несуществующему аниме", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${noAnimeId}/status`)
      .send({ status: "added" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)

    await request(app.getHttpServer())
      .patch(`/user/${noAnimeId}/score`)
      .send({ score: 10 })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  // TODO: убрать
  it("updateAnimeScore (ERR) - Поставить оценку аниме не в списке", async () => {
    await request(app.getHttpServer())
      .patch(`/user/${animeId}/status`)
      .send({ score: 10 })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })
})
