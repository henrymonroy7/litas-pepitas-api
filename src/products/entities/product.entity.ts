import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../categories/entities/category.entity";
import { Common } from "../../common/entities/common.entity";

@Entity()
export class Product extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", {
    nullable: false,
  })
  name: string;

  @Column("text", {
    nullable: false,
  })
  shortDescription: string;

  @Column("text", {
    nullable: false,
  })
  description: string;

  @Column("int", {
    nullable: false,
  })
  price: number;

  @Column("text", {
    nullable: false,
  })
  stock: number;

  @Column("text", {
    nullable: false,
  })
  sku: string;

  @Column("text", {
    array: true,
    nullable: true,
  })
  images?: string[];

  @Column("text", {
    array: true,
    nullable: true,
  })
  colors?: string[];

  @Column("text", {
    array: true,
    nullable: true,
  })
  tags?: string[];

  @ManyToOne(() => Category, (cat) => cat.products, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ referencedColumnName: "id" })
  category: Category;
}
