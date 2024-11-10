import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CandidatoService } from '../../candidatos/services/candidato.service';

@Injectable()
export class CandidatoAuthService {
  constructor(
    private readonly candidatoService: CandidatoService,
    private readonly jwtService: JwtService,
  ) {}

  async validarCandidato(email: string, senha: string) {
    const candidato = await this.candidatoService.findByEmail(email); // Método para buscar candidato por email
    if (candidato && await bcrypt.compare(senha, candidato.senha)) {
      return candidato;
    }
    return null;
  }

  async login(candidato: any) {
    const payload = { sub: candidato.id, email: candidato.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
