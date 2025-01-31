import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('Validating user in LocalStrategy:', { username, password });

    const user = await this.authService.checkUser(username, password);
    if (!user) {
      console.error('User validation failed:', username);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User validated successfully:', user);
    return user;
  }
}
