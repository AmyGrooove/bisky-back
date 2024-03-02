import { Controller, Get } from "@nestjs/common"
import { FactsService } from "../services/facts.service"

@Controller("getOneRandomFact")
export class FactsController {
  constructor(private factsService: FactsService) {}

  @Get("/")
  getOneRandomFact() {
    return this.factsService.getOneRandomFact()
  }
}
