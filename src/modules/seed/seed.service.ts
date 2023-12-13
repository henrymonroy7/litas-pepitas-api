import { Injectable } from "@nestjs/common";
import { SEED_CATEGORIES } from "./data/seed-categories";
import { SEED_SUPPLIES } from "./data/seed-supplies";
import { CategoriesService } from "../categories/categories.service";
import { SuppliesService } from "../supplies/supplies.service";

@Injectable()
export class SeedService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly suppliesService: SuppliesService,
  ) {}

  async runSeed() {
    this.insertNewCategories();
    this.insertNewSupplies();
    return "SEED EXECUTED";
  }

  private async insertNewCategories() {
    await this.categoriesService.removeAll();
    const insertPromises = [];
    SEED_CATEGORIES.forEach((cat) => {
      insertPromises.push(this.categoriesService.create(cat));
    });
    await Promise.all(insertPromises);
    return;
  }

  private async insertNewSupplies() {
    await this.suppliesService.removeAll();
    const insertPromises = [];
    SEED_SUPPLIES.forEach((supply) => {
      insertPromises.push(this.suppliesService.create(supply));
    });
    await Promise.all(insertPromises);
    return;
  }
}
