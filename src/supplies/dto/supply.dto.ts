import { IsInt, IsOptional, IsString } from "class-validator";

export class SupplyDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  mnemonic: string;
}
