import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export enum AccountType {
  FREELANCER = 'FREELANCER',
  CLIENT = 'CLIENT',
  COMPANY = 'COMPANY',
  AGENCY = 'AGENCY',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password_hash: string;

  @IsEnum(AccountType)
  account_type: AccountType;

  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  tagline?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}
