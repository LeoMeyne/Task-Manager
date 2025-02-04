import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Check user credentials and authenticate
  async checkUser(username: string, password: string): Promise<any> {
    // Retrieve user from the database
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Return user data without the password
    const { password: _, ...result } = user;
    return result;
  }

  // Generate a JWT access token for a user
  async login(user: any) {
    const payload = { username: user.username, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Add a new user to the database
  async addUser(userData: Partial<User>) {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }
}
