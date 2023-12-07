import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductRepository } from "./products.repository";
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
} from "nestjs-paginate";

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.productRepository.getRepository(), {
      sortableColumns: ["id", "name", "price", "sku", "category.name"],
      relations: ["category"],
      nullSort: "last",
      defaultSortBy: [["id", "DESC"]],
      searchableColumns: ["name", "price", "sku", "category.name"],
      select: [
        "id",
        "name",
        "shortDescription",
        "description",
        "price",
        "stock",
        "sku",
        "images",
        "category.id",
        "category.name",
        "category.mnemonic",
      ],
      filterableColumns: {
        moduleId: [FilterOperator.IN],
        name: [FilterOperator.EQ, FilterOperator.ILIKE, FilterSuffix.NOT],
        "application.applicationId": [FilterOperator.EQ, FilterOperator.IN],
        path: [FilterOperator.EQ, FilterOperator.CONTAINS],
        valid: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateResult = await this.productRepository.update(
      id,
      updateProductDto,
    );
    if (updateResult.affected === 0)
      throw new NotFoundException(`Product with id ${id} not found`);
    return updateResult;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
