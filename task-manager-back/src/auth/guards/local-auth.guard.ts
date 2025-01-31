import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Exécute la logique de la garde de base
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    return !!request.user;  // Vérifie que l'utilisateur est authentifié
  }
}
