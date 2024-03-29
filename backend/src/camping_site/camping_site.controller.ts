import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Review } from '../review/entities/review.entity';
import { Public } from '../metadata';
import { CampingSiteService } from './camping_site.service';
import { CreateCampingSiteDto } from './dto/create-camping_site.dto';
import { UpdateCampingSiteDto } from './dto/update-camping_site.dto';
import { CampingSite } from './entities/camping_site.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Campsites')
@Controller('campsites')
export class CampingSiteController {
  constructor(private readonly campingSiteService: CampingSiteService) { }

  @Get('popular')
  @Public()
  async getMostPopularCampsites(): Promise<CampingSite[]> {
    return await this.campingSiteService.getFiveMostPopularCampsites();
  }

  @Get('search')
  @Public()
  async searchCampsite(@Query('query') searchString: string,): Promise<CampingSite[]> {
    return await this.campingSiteService.searchCampsite(searchString);
  }

  @Get('available')
  @Public()
  async getAvailableCampsites(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
    @Query('guests') guests: number,
  ): Promise<CampingSite[]> {
    return await this.campingSiteService.getAvailableCampsites(startDate, endDate, guests);
  }

  @Get('best')
  @Public()
  async getFiveBestCampsites(): Promise<CampingSite[]> {
    return await this.campingSiteService.getFiveBestCampsites();
  }

  @Get('/:id/reviews')
  @Public()
  async getReviewsById(@Param('id') id: number): Promise<Review[]> {
    return await this.campingSiteService.getReviewsById(id);
  }

  @Get()
  @Public()
  async getCampSites(
    @Query('skip') skip: number,
    @Query('limit') limit: number
  ): Promise<CampingSite[]> {
    return await this.campingSiteService.getCampsites(skip, limit);
  }

  @Get(":id")
  @Public()
  findOne(@Param("id") id: string) {
    return this.campingSiteService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCampingSiteDto: UpdateCampingSiteDto
  ) {
    return this.campingSiteService.update(+id, updateCampingSiteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.campingSiteService.remove(+id);
  }

  @Post()
  @Public()
  create(@Body() createCampingSiteDto: CreateCampingSiteDto) {
    return this.campingSiteService.create(createCampingSiteDto);
  }

}
