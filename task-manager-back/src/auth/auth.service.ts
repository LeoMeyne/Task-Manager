import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private users = [];
  constructor(private jwtService: JwtService) {
    this.seedUser();
  }

  private async seedUser(){
    const hashedPassword = await bcrypt.hash('admin123', 10);
    this.users.push({ id: 1, username: 'admin', password: hashedPassword });
  }

  async checkUser(username: string, password: string): Promise<any> {
    const user = this.users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: any){
    const payload = { username: user.username, password: user.password };
    return{
      accessToken: this.jwtService.sign(payload),
    }
  }

}
