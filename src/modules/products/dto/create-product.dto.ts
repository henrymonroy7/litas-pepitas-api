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
  @IsIn([
    "rojo",
    "verde",
    "azul",
    "negro",
    "anaranjado",
    "rosa",
    "blanco",
    "amarillo",
  ]) //Hacer un enum
  colors?: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @IsIn(["kids", "zodiaco", "pets", "calzado", "religioso", "neon"]) //Hacer un enum
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
