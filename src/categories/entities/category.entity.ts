import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Common } from "../../common/entities/common.entity";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Category extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false, unique: true })
  name: string;

  @Column("text", { nullable: false })
  description: string;

  @Column("text", { nullable: false, unique: true })
  mnemonic: string;

  @OneToMany(() => Product, (prod) => prod.category)
  products: Product[];

  @BeforeInsert()
  beforeInsert() {
    if (!this.description) this.description = "";
  }
}
