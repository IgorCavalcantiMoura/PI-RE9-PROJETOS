import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CandidatoAuthService } from '../services/candidato-auth.service';

@Controller('auth/candidato')
export class CandidatoAuthController {
  constructor(private readonly candidatoAuthService: CandidatoAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar candidato' })
  @ApiBody({
    description: 'Informações de login do candidato',
    type: Object,
    examples: {
      loginExample: {
        value: {
          email: 'candidato@exemplo.com',
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
    const candidato = await this.candidatoAuthService.validarCandidato(email, senha);
    if (!candidato) {
      throw new Error('Credenciais inválidas');
    }
    return this.candidatoAuthService.login(candidato);
  }
}
