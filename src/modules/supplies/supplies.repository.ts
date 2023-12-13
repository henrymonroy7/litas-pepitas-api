import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Supply } from "./entities/supply.entity";
import { BaseRepository } from "../../common/base-repository.repository";

export class SuppliesRepository extends BaseRepository<Supply> {
  constructor(
    @InjectRepository(Supply)
    private readonly suppliesRepository: Repository<Supply>,
  ) {
    super(suppliesRepository);
  }
}
