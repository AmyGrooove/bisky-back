import { Body, Controller, HttpException, Put } from '@nestjs/common';
import { UpdateAnimesDto } from 'src/dto/updateAnimes.dto';

import { ShikiService } from './shiki.service';

@Controller('shiki')
export class ShikiController {
  constructor(private readonly shikiService: ShikiService) {}

  @Put('/')
  updateAnimes(
    @Body() updateAnimesDto: UpdateAnimesDto,
  ): Promise<number | HttpException> {
    return this.shikiService.updateAnimes(updateAnimesDto);
  }
}
