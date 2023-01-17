import { forwardRef, Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { CampingSiteModule } from "../camping_site/camping_site.module";

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [TypeOrmModule.forFeature([Review]), forwardRef(() => CampingSiteModule)],
  exports: [ReviewService],
})
export class ReviewModule {}
