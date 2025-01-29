import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;  // 📝 Nom du projet (obligatoire)

  @IsOptional()
  @IsString()
  description?: string;  // 📝 Description du projet (optionnelle)
}
