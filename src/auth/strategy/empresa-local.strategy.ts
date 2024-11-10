// src/auth/strategies/empresa-local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmpresaAuthService } from '../services/empresa-auth.service';



@Injectable()
export class EmpresaLocalStrategy extends PassportStrategy(Strategy, 'empresa-local') {
  constructor(private readonly authService: EmpresaAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const empresa = await this.authService.validarEmpresa(email, password);
    if (!empresa) {
      throw new UnauthorizedException('Credenciais inválidas para empresa');
    }
    return empresa;
  }
}
