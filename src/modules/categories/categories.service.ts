import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryRepository } from "./categories.repository";

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  //mejorar busqueda
  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateResult = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );
    return updateResult;
  }

  async remove(id: number) {
    const deleteResult = await this.categoryRepository.delete(id);
    if (deleteResult.affected === 0)
      throw new NotFoundException(`Category ${id} not found`);
    return deleteResult;
  }

  /**Usar solo para endpoint seed */
  async removeAll() {
    const query = this.categoryRepository.createQueryBuilder();
    return await query.delete().where({}).execute();
  }
}
