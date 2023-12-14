import { Injectable } from "@nestjs/common";
import { CategoriesService } from "../categories/categories.service";
import { SuppliesService } from "../supplies/supplies.service";
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_SUPPLIES } from "./data";
import { ProductService } from "../products/products.service";
import { CreateProductDto } from "../products/dto/create-product.dto";
import { plainToClass } from "class-transformer";
import { SupplyDto } from "../supplies/dto/supply.dto";
import { CategoryDto } from "../categories/dto/category.dto";

@Injectable()
export class SeedService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly suppliesService: SuppliesService,
    private readonly productsService: ProductService,
  ) {}

  async runSeed() {
    await this.insertNewCategories();
    await this.insertNewSupplies();
    await this.insertNewProducts();
    return "SEED EXECUTED";
  }

  private async insertNewCategories() {
    await this.categoriesService.removeAll();
    const insertPromises = SEED_CATEGORIES.map((cat) => {
      return this.categoriesService.create(cat);
    });
    await Promise.all(insertPromises);
    return;
  }

  private async insertNewSupplies() {
    await this.suppliesService.removeAll();
    const insertPromises = SEED_SUPPLIES.map((supply) => {
      return this.suppliesService.create(supply);
    });
    await Promise.all(insertPromises);
    return;
  }

  async insertNewProducts() {
    await this.productsService.removeAll();
    const [categories, supplies] = await Promise.all([
      this.categoriesService.findAll(),
      this.suppliesService.findAll(),
    ]);
    const insertPromises = SEED_PRODUCTS.map((product) => {
      const newProduct: CreateProductDto = new CreateProductDto();
      newProduct.name = product.name;
      newProduct.shortDescription = product.shortDescription;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.colors = product.colors;
      newProduct.category = plainToClass(
        CategoryDto,
        categories.find((cat) => (cat.name = product.category)),
      );
      newProduct.supply = plainToClass(
        SupplyDto,
        supplies.find((sup) => (sup.name = product.supply)),
      );
      return this.productsService.create(newProduct);
    });
    await Promise.all(insertPromises);
    return;
  }
}
