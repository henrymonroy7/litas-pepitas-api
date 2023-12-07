import { Injectable } from "@nestjs/common";
import { CategoriesService } from "../categories/categories.service";
import { SEED_CATEGORIES } from "./data/seed-categories";

@Injectable()
export class SeedService {
  constructor(private readonly categoriesService: CategoriesService) {}

  async runSeed() {
    this.insertNewCategories();
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
}
