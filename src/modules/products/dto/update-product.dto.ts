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
  @IsOptional()
  name?: string;

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
}
