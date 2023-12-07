import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { CategoriesModule } from "../categories/categories.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CategoriesModule],
})
export class SeedModule {}
