import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../common/base-repository.repository";
import { Repository } from "typeorm";
import { Supply } from "./entities/supply.entity";

export class SuppliesRepository extends BaseRepository<Supply> {
  constructor(
    @InjectRepository(Supply)
    private readonly suppliesRepository: Repository<Supply>,
  ) {
    super(suppliesRepository);
  }
}
