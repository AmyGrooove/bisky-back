import { Controller, Get } from "@nestjs/common"
import { FactService } from "../services/fact.service"

@Controller("getOneRandomFact")
export class FactController {
  constructor(private factService: FactService) {}

  @Get("/")
  getOneRandomFact() {
    return this.factService.getOneRandomFact()
  }
}
