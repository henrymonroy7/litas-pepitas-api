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
    // const code = uuid.split("-").join("").substring(0, 8);
    // const sku =
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
        "colors",
        "tags",
        "category.id",
        "category.name",
        "category.mnemonic",
      ],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE, FilterSuffix.NOT],
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

  async remove(id: number) {
    const deleteResult = await this.productRepository.delete(id);
    if (!deleteResult)
      throw new NotFoundException(`Product with id ${id} not found`);
    return deleteResult;
  }

  // const { v4: uuidv4 } = require('uuid');

  private generarCodigoUnico(uuid) {
    return uuid.split("-").join("").substring(0, 6);
  }
}
