import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongooseModule } from "@nestjs/mongoose"

import { AppModule } from "../src/modules/app/app.module"

describe("Genre Controller (e2e)", () => {
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

  it("allIdsAndNames - Получить id всех жанров и их названия", async () => {
    await request(app.getHttpServer()).get("/genre/allIdsAndNames").expect(200)
  })
})
