import { Controller, Get, Query } from '@nestjs/common';
import { SearchParamsDto } from './dto/search-params.dto';
import { SearchingService } from './searching.service';

@Controller('api/search')
export class SearchingController {
  constructor(private searchingService: SearchingService) {}

  @Get()
  async search(@Query() searchParamsDto: SearchParamsDto) {
      return await this.searchingService.search(searchParamsDto)
  }
}