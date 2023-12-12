import {
  IsArray,
  IsIn,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";
import { CategoryDto } from "../../categories/dto/category.dto";
import { SupplyDto } from "../../supplies/dto/supply.dto";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  sku?: string; //Prox. Se debe calcular antes de guardar: [CATEGORY]-[SUPPLY]-[CODIGO]

  @IsNumber()
  @IsPositive()
  @Min(1000)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @IsIn(["Rojo", "Verde", "Azul"]) //Hacer un enum
  colors?: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SupplyDto)
  supply: SupplyDto;
}
