import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common } from '../../common/entities/common.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category extends Common {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text', { nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Column('text', { nullable: false })
  description: string;

  @ApiProperty()
  @Column('text', { nullable: false, unique: true })
  mnemonic: string;

  @ApiProperty()
  @OneToMany(() => Product, (prod) => prod.category)
  products: Product[];

  @BeforeInsert()
  beforeInsert() {
    this.name = this.name.toUpperCase();
    this.mnemonic = this.mnemonic.toUpperCase();
    if (!this.description) this.description = '';
  }
}
