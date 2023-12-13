import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  mnemonic: string;
}
