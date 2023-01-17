import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReviewService } from "src/review/review.service";
import { CampingSiteService } from "./camping_site.service";
import { CreateCampingSiteDto } from "./dto/create-camping_site.dto";
import { UpdateCampingSiteDto } from "./dto/update-camping_site.dto";

@Controller("camping-site")
export class CampingSiteController {
  
  constructor(
    private readonly campingSiteService: CampingSiteService,
    ) {}

  @Post()
  create(@Body() createCampingSiteDto: CreateCampingSiteDto) {
    return this.campingSiteService.create(createCampingSiteDto);
  }

 // @Get(":id")
  //getByCampingSiteId(@Param("id") id: string) {
  //return this.campingSiteService.getCampsiteReviews(+id);
  //}

  @Get()
  findAll() {
    return this.campingSiteService.findAll();
  }

  @Get(":id")
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
}
