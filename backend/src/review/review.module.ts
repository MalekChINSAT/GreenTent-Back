import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { CampingSiteModule } from "../camping_site/camping_site.module";

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [CampingSiteModule, TypeOrmModule.forFeature([Review])],
  exports: [ReviewService],
})
export class ReviewModule {}
