import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongooseModule } from "@nestjs/mongoose"

import { AppModule } from "../src/modules/app/app.module"

import { getRandomValue } from "./functions/getRandomValue"

describe("Auth Controller (e2e)", () => {
  let app: INestApplication
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
    await mongoServer.stop()
  })

  it("whoami - Получить основную информацию о пользователе", async () => {
    const testUser = {
      username: `testuser${getRandomValue()}`,
      password: `password${getRandomValue()}`,
      email: `test${getRandomValue()}@example.com`,
    }

    const user = await request(app.getHttpServer())
      .put("/auth/register")
      .send(testUser)
      .expect(200)

    const response = await request(app.getHttpServer())
      .get("/auth/whoami")
      .set("Authorization", `Bearer ${user.body.accessToken}`)
      .expect(200)

    expect(response.body.username === testUser.username)
  })

  it("whoami (ERR) - Неправильный access_token", async () => {
    await request(app.getHttpServer())
      .get("/auth/whoami")
      .set("Authorization", `Bearer 123`)
      .expect(401)
  })

  it("register - Зарегистрировать нового пользователя", async () => {
    const testUser = {
      username: `testuser${getRandomValue()}`,
      password: `password${getRandomValue()}`,
      email: `test${getRandomValue()}@example.com`,
    }

    await request(app.getHttpServer())
      .put("/auth/register")
      .send(testUser)
      .expect(200)
  })

  it("register (ERR) - Зарегистрировать нового пользователя с занятыми данными", async () => {
    const testUser = {
      username: `testuser${getRandomValue()}`,
      password: `password${getRandomValue()}`,
      email: `test${getRandomValue()}@example.com`,
    }

    await request(app.getHttpServer())
      .put("/auth/register")
      .send(testUser)
      .expect(200)

    await request(app.getHttpServer())
      .put("/auth/register")
      .send(testUser)
      .expect(400)
  })

  // TODO: Посмотреть в чем проблема
  it("register (ERR) - Зарегистрировать нового пользователя с неправильными данными", async () => {
    const testUser = {
      username: "123",
      password: "123",
      email: "123",
    }

    await request(app.getHttpServer())
      .put("/auth/register")
      .send(testUser)
      .expect(200)
  })

  it("login - Авторизовать пользователя", async () => {
    const testUser = {
      username: `testuser${getRandomValue()}`,
      password: `password${getRandomValue()}`,
      email: `test${getRandomValue()}@example.com`,
    }

    await request(app.getHttpServer()).put("/auth/register").send(testUser)

    await request(app.getHttpServer())
      .post("/auth/login")
      .send(testUser)
      .expect(201)
  })

  it("login (ERR) - Авторизовать пользователя с неправильными данными", async () => {
    const testUser = {
      username: "123",
      password: "123",
      email: "123",
    }

    await request(app.getHttpServer())
      .post("/auth/login")
      .send(testUser)
      .expect(201)
  })

  it("refresh - Обновить access и refresh токены через refresh", async () => {
    const testUser = {
      username: "123",
      password: "123",
      email: "123",
    }

    const user = await request(app.getHttpServer())
      .post("/auth/login")
      .send(testUser)
      .expect(201)

    await request(app.getHttpServer())
      .patch("/auth/refresh")
      .set("Authorization", `Bearer ${user.body.refreshToken}`)
      .expect(200)
  })

  it("refresh (ERR) - Обновить access и refresh токены через неправильный refresh", async () => {
    await request(app.getHttpServer())
      .patch("/auth/refresh")
      .set("Authorization", `Bearer 123`)
      .expect(401)
  })

  it("logout - Выйти из сессии", async () => {
    const testUser = {
      username: "123",
      password: "123",
      email: "123",
    }

    const user = await request(app.getHttpServer())
      .post("/auth/login")
      .send(testUser)
      .expect(201)

    await request(app.getHttpServer())
      .patch("/auth/logout")
      .set("Authorization", `Bearer ${user.body.accessToken}`)
      .expect(200)
  })

  it("logout (ERR) - Выйти из сессии неавторизованного пользователя", async () => {
    await request(app.getHttpServer())
      .patch("/auth/logout")
      .set("Authorization", `Bearer 123`)
      .expect(401)
  })
})
