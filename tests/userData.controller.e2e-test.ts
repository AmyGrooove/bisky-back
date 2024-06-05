import path from "path"

import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongooseModule } from "@nestjs/mongoose"

import { AppModule } from "../src/modules/app/app.module"
import { AuthController } from "../src/modules/auth/controllers/auth.controller"
import { UserWithTokensModel } from "../src/modules/auth/entities/userWithTokens.entity"

describe("UserData Controller (e2e)", () => {
  let app: INestApplication
  let mongoServer: MongoMemoryServer

  let user: UserWithTokensModel
  let userToSubscribe: UserWithTokensModel

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
    userToSubscribe = await userController.register({
      username: "testuser2",
      password: "password",
      email: "test2@example.com",
    })
  })

  afterAll(async () => {
    await app.close()
    await mongoServer.stop()
  })

  it("subscribeToUser - Подписаться на пользователя", async () => {
    await request(app.getHttpServer())
      .patch("/user/subscribeToUser")
      .send({ subscribeUserId: userToSubscribe._id })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(200)
  })

  it("subscribeToUser (ERR) - Подписаться на несуществующего пользователя", async () => {
    await request(app.getHttpServer())
      .patch("/user/subscribeToUser")
      .send({ subscribeUserId: "0" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  it("subscribeToUser - Отписаться от пользователя", async () => {
    await request(app.getHttpServer())
      .patch("/user/subscribeToUser")
      .send({ subscribeUserId: userToSubscribe._id })
      .set("Authorization", `Bearer ${user.accessToken}`)

    await request(app.getHttpServer())
      .delete("/user/subscribeToUser")
      .send({ subscribeUserId: userToSubscribe._id })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(200)
  })

  it("subscribeToUser (ERR) - Отписаться от несуществующего пользователя", async () => {
    await request(app.getHttpServer())
      .delete("/user/subscribeToUser")
      .send({ subscribeUserId: "0" })
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(400)
  })

  it("avatar - Изменить аватарку", async () => {
    await request(app.getHttpServer())
      .patch("/user/avatar")
      .attach("file", path.join(__dirname, "/static/test.jpg"))
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(200)
  })

  it("background - Изменить задний фон", async () => {
    await request(app.getHttpServer())
      .patch("/user/background")
      .attach("file", path.join(__dirname, "/static/test.jpg"))
      .set("Authorization", `Bearer ${user.accessToken}`)
      .expect(200)
  })
})
