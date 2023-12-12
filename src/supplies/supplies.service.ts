import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateSupplyDto } from "./dto/create-supply.dto";
import { SuppliesRepository } from "./supplies.repository";

@Injectable()
export class SuppliesService {
  constructor(
    @Inject(SuppliesRepository)
    private readonly suppliesRepository: SuppliesRepository,
  ) {}
  async create(createSupplyDto: CreateSupplyDto) {
    return await this.suppliesRepository.save(createSupplyDto);
  }

  async findAll() {
    return await this.suppliesRepository.find();
  }

  async findOne(id: number) {
    const supply = await this.suppliesRepository.findOneBy({ id });
    if (!supply) throw new NotFoundException(`Supply with id ${id} not found`);
    return supply;
  }

  async remove(id: number) {
    const deleteResult = await this.suppliesRepository.delete(id);
    if (deleteResult.affected === 0)
      throw new NotFoundException(`Supply with id ${id} not found`);
    return deleteResult;
  }

  /**Usar solo para endpoint seed */
  async removeAll() {
    const query = this.suppliesRepository.createQueryBuilder();
    return await query.delete().where({}).execute();
  }
}
