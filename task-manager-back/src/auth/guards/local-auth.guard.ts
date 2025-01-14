import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Le guard utilise la stratégie "local" pour valider les identifiants
export class LocalAuthGuard extends AuthGuard('local') {}
