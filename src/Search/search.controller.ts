import { Controller, Get, Query } from '@nestjs/common';

import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findTitle(@Query('value') value: string) {
    console.log(value);
    return this.searchService.findTitle(value);
  }
}
