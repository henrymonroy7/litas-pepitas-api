import { IsInt, IsOptional, IsString } from "class-validator";

export class CategoryDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  mnemonic: string;
}
