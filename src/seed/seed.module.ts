import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { CategoriesModule } from "../categories/categories.module";
import { SuppliesModule } from "../supplies/supplies.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CategoriesModule, SuppliesModule],
})
export class SeedModule {}
