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

  async checkUser(username: string, password: string): Promise<any> {
    console.log('Checking user in database:', username);

    // Récupère l'utilisateur en base
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      console.error('User not found:', username);
      throw new UnauthorizedException('Invalid username or password');
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password for user:', username);
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log('User authenticated successfully:', username);
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async addUser(userData: Partial<User>) {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }
}
