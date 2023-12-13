import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSupplyDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  mnemonic: string;
}
