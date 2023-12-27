import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  number: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
