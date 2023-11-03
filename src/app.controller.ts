import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesWithCountDto } from './dto/cities-with-count.dto';
import { CitiesAndCountMembersWithSameName } from './dto/cities-and-count-members-with-same-name.dto';

@ApiTags('Api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'get cities with residents count',
    type: [CitiesWithCountDto],
  })
  @Get('/count')
  async getCitiesWithCount(@Res() res: Response): Promise<any> {
    const result = await this.appService.getCitiesWithCount();
    res.locals.data = result;
    return res.json(result);
  }

  @ApiResponse({
    status: 200,
    description: 'get count of members with same first_name by every city',
    type: [CitiesAndCountMembersWithSameName],
  })
  @Get('/members')
  async getCitiesAndCountMembersWithSameName(
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.appService.getCitiesAndCountMembersWithSameName();
    res.locals.data = result;
    return res.json(result);
  }
}
