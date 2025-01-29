import { IsNotEmpty, IsInt } from 'class-validator';

export class RemoveMemberDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;  // 🔑 ID de l'utilisateur à retirer du projet
}
