import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    console.log('User attempting login:', req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)  // Utilise le JwtAuthGuard pour vérifier l'authentification
  @Get('me')
  getProfile(@Req() req) {
    return {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    };
  }
}
