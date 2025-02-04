import { IsNotEmpty, IsInt } from 'class-validator';

export class RemoveMemberDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
