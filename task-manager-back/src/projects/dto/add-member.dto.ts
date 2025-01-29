import { IsNotEmpty, IsInt } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
