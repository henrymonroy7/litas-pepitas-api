import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from "typeorm";

export interface IBaseRepository<T> {
  findBy(filters: any): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  findOneBy(filters: any): Promise<T>;
  createQueryBuilder(): SelectQueryBuilder<T>;
  create(data: DeepPartial<T>): T;
  save(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: DeepPartial<T>): Promise<UpdateResult>;
  executeQuery(query: string): Promise<any>;
  getRepository(): Repository<T>;
  delete(filters: any): Promise<DeleteResult>;
}
