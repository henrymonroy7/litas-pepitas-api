import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryRepository } from "./categories.repository";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoriesService],
})
export class CategoriesModule {}