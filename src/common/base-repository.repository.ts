import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { IBaseRepository } from "./interfaces/base-repository.interface";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async find(): Promise<T[]> {
    return this.repository.find();
  }
  async findBy(filters: any): Promise<T[]> {
    return this.repository.findBy(filters);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async findOneBy(filters: any): Promise<T> {
    return this.repository.findOneBy(filters);
  }

  createQueryBuilder(): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder();
  }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  createAll(data: DeepPartial<T>[]): T[] {
    return this.repository.create(data);
  }

  async save(data: DeepPartial<T>): Promise<T> {
    const entity = this.create(data);

    return this.repository.save(entity);
  }

  async saveAll(data: DeepPartial<T>[]): Promise<T[]> {
    const entity = this.createAll(data);

    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<UpdateResult> {
    const entityData = this.repository.create(
      data,
    ) as QueryDeepPartialEntity<T>;
    return this.repository.update(id, entityData);
  }

  async executeQuery(query: string): Promise<any> {
    return this.repository.query(query);
  }

  getRepository() {
    return this.repository;
  }

  async delete(filters: any): Promise<DeleteResult> {
    return this.repository.delete(filters);
  }
}
