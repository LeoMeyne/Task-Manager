import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configure the local strategy to use 'username' and 'password' fields
    super({ usernameField: 'username', passwordField: 'password' });
  }

  // Validate user credentials during login
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.checkUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;  // Return validated user if credentials are correct
  }
}
