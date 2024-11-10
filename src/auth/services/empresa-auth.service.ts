import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { EmpresasService } from '../../empresas/services/empresa.service';

@Injectable()
export class EmpresaAuthService {
  constructor(
    private readonly empresaService: EmpresasService,
    private readonly jwtService: JwtService,
  ) {}

  async validarEmpresa(email: string, senha: string) {
    const empresa = await this.empresaService.findByEmail(email); // Método para buscar empresa por email
    if (empresa && await bcrypt.compare(senha, empresa.senha)) {
      return empresa;
    }
    return null;
  }

  async login(empresa: any) {
    const payload = { sub: empresa.id, email: empresa.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
