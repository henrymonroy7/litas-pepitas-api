import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  shortDescription: string;

  @IsString()
  @IsOptional()
  description?: string;

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
}
