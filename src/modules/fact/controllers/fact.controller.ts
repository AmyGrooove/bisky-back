import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { FactService } from "../services/fact.service"
import { FactModel } from "../entities/fact.entity"

@ApiTags("Fact")
@UseInterceptors(CacheInterceptor)
@Controller("getOneRandomFact")
class FactController {
  constructor(private factService: FactService) {}

  @ApiOperation({ summary: "Get a random fact" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: FactModel,
  })
  @Get("/")
  async getOneRandomFact() {
    return this.factService.getOneRandomFact()
  }
}

export { FactController }
