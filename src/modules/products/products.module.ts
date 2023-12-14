import { Module } from "@nestjs/common";

import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductRepository } from "./products.repository";
import { Product } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductService],
})
export class ProductsModule {}
