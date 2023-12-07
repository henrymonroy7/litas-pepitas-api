import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ParseObjectPipe } from "src/common/pipes/parse-object.pipe";
import { ProductService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Paginate, PaginateQuery } from "nestjs-paginate";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body(ParseObjectPipe) createProductoDto: CreateProductDto) {
    return this.productService.create(createProductoDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body(ParseObjectPipe) updateProductoDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
