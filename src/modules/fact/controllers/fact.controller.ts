import { Controller, Get, HttpStatus } from "@nestjs/common"
import { FactService } from "../services/fact.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { FactModel } from "../entities/fact.entity"

@ApiTags("Fact")
@Controller("getOneRandomFact")
export class FactController {
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
