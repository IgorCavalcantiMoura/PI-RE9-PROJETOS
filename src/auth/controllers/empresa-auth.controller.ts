import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmpresaAuthService } from '../services/empresa-auth.service';

@Controller('auth/empresa')
export class EmpresaAuthController {
  constructor(private readonly empresaAuthService: EmpresaAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar empresa' })
  @ApiBody({
    description: 'Informações de login da empresa',
    type: Object,
    examples: {
      loginExample: {
        value: {
          email: 'empresa@exemplo.com',
          senha: 'senha123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Credenciais inválidas' })
  async login(@Body('email') email: string, @Body('senha') senha: string) {
    const empresa = await this.empresaAuthService.validarEmpresa(email, senha);
    if (!empresa) {
      throw new Error('Credenciais inválidas');
    }
    return this.empresaAuthService.login(empresa);
  }
}
