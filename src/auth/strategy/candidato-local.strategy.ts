// src/auth/strategies/candidato-local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CandidatoAuthService } from '../services/candidato-auth.service';
;


@Injectable()
export class CandidatoLocalStrategy extends PassportStrategy(Strategy, 'candidato-local') {
  constructor(private readonly authService: CandidatoAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const candidato = await this.authService.validarCandidato(email, password);
    if (!candidato) {
      throw new UnauthorizedException('Credenciais inválidas para candidato');
    }
    return candidato;
  }
}
