import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import ProductTag from "../enums/tags.enum";
import ProductColor from "../enums/colors.enum";

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
  @IsEnum(ProductColor, { each: true })
  colors?: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @IsOptional()
  @IsEnum(ProductTag, { each: true })
  tags?: string[];
}
