import { Module } from "@nestjs/common";
import { SuppliesService } from "./supplies.service";
import { SuppliesController } from "./supplies.controller";
import { SuppliesRepository } from "./supplies.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supply } from "./entities/supply.entity";

@Module({
  controllers: [SuppliesController],
  providers: [SuppliesService, SuppliesRepository],
  imports: [TypeOrmModule.forFeature([Supply])],
  exports: [SuppliesService],
})
export class SuppliesModule {}
