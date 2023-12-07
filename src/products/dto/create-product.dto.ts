import {
  IsArray,
  IsIn,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { CreateCategoryDto } from "../../categories/dto/create-category.dto";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  shortDescription: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  sku: string; //Prox. Se debe calcular antes de guardar: [CATEGORIA]-[MATERIAL]-[#consecutivo]-[INFOADICIONAL]

  @IsNumber()
  @IsPositive()
  @Min(1000)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @IsIn(["Rojo", "Verde", "Azul"]) //Hacer un enum
  colors?: string[];

  @IsNotEmptyObject()
  category: CreateCategoryDto;
}
