import { Body, Controller, HttpException, Put } from '@nestjs/common';

import { UpdateAnimesDto } from '../dto/updateAnimes.dto';

import { ShikiService } from './shiki.service';

@Controller('shiki')
export class ShikiController {
  constructor(private readonly shikiService: ShikiService) {}

  @Put('/shikiParse')
  shikiParse(
    @Body() updateAnimesDto: UpdateAnimesDto,
  ): Promise<number | HttpException> {
    return this.shikiService.shikiParse(updateAnimesDto);
  }

  @Put('/updateAnimes')
  updateAnimes(): Promise<number | HttpException> {
    return this.shikiService.updateAnimes();
  }
}
