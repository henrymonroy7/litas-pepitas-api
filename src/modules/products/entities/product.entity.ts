import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../categories/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Supply } from "../../supplies/entities/supply.entity";
import { v4 as uuid } from "uuid";
import { Common } from "../../../common/entities/common.entity";

@Entity()
export class Product extends Common {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column("text", {
    nullable: false,
    default: "",
  })
  name: string;

  @ApiProperty()
  @Column("text", {
    nullable: false,
    default: "",
  })
  shortDescription: string;

  @ApiProperty()
  @Column("text", {
    nullable: false,
    default: "",
  })
  description: string;

  @ApiProperty()
  @Column("int", {
    nullable: false,
    default: 0,
  })
  price: number;

  @ApiProperty()
  @Column("int", {
    nullable: false,
    default: 0,
  })
  stock: number;

  @ApiProperty()
  @Column("text", {
    nullable: false,
    default: "",
  })
  sku: string;

  @ApiProperty()
  @Column("text", {
    array: true,
    nullable: true,
  })
  images?: string[];

  @ApiProperty()
  @Column("text", {
    array: true,
    nullable: true,
  })
  colors?: string[];

  @ApiProperty()
  @Column("text", {
    array: true,
    nullable: true,
  })
  tags?: string[];

  @ApiProperty()
  @ManyToOne(() => Category, (cat) => cat.products, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ referencedColumnName: "id" })
  category: Category;

  @ApiProperty()
  @ManyToOne(() => Supply, (sup) => sup.products, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ referencedColumnName: "id" })
  supply: Supply;

  @BeforeInsert()
  beforeInsert() {
    const code = uuid().split("-").join("").substring(0, 8);
    this.sku =
      `${this.category.mnemonic}-${this.supply.mnemonic}-${code}`.toUpperCase();
    this.name = !this.name ? "" : this.name.toUpperCase();
  }
}
