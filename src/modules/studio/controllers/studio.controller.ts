import { Controller, Get, HttpStatus } from "@nestjs/common"
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from "@nestjs/swagger"
import { StudioService } from "../services/studio.service"

class StudioIdAndName {
  @ApiProperty()
  name: string

  @ApiProperty()
  _id: string
}

@ApiTags("Studio")
@Controller("studio")
class StudioController {
  constructor(private studioService: StudioService) {}

  @ApiOperation({ summary: "Get all id`s and names" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [StudioIdAndName],
  })
  @Get("allIdsAndNames")
  async allIdsAndNames() {
    return this.studioService.getAllStudioIdsAndNames()
  }
}

export { StudioController }
