import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../common/base-repository.repository";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
