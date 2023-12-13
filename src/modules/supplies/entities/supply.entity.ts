import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";
import { Common } from "../../../common/entities/common.entity";

@Entity()
export class Supply extends Common {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column("text", { nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Column("text", { nullable: false, unique: true })
  mnemonic: string;

  @ApiProperty()
  @OneToMany(() => Product, (prod) => prod.supply)
  products: Product[];
}
