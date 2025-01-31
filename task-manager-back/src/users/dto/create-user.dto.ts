import { IsString, IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(['user', 'team_leader'], { message: 'Role must be either "user" or "team_leader"' })
  role: 'user' | 'team_leader';
}
