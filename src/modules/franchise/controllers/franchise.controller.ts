import { Controller, Get, HttpStatus, UseInterceptors } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { CacheInterceptor } from "@nestjs/cache-manager"

import { FranchiseService } from "../services/franchise.service"

@ApiTags("Franchise")
@UseInterceptors(CacheInterceptor)
@Controller("franchise")
class FranchiseController {
  constructor(private franchiseService: FranchiseService) {}

  @ApiOperation({ summary: "Get all id`s" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [String],
  })
  @Get("allIds")
  async allIds() {
    return this.franchiseService.getAllGenreIds()
  }
}

export { FranchiseController }
