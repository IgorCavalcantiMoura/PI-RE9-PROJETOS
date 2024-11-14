import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { PerfilCandidato } from '../entities/perfilCandidato.entity';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PerfilCandidatoService } from '../services/perfilCandidato.service';

@ApiTags('Perfil Candidato')
@Controller('perfil-candidato')
export class PerfilCandidatoController {
  constructor(private readonly perfilCandidatoService: PerfilCandidatoService) {}

  // Endpoint para criar um novo perfil de candidato
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Perfil de candidato criado com sucesso',
    type: PerfilCandidato,
  })
  async criarPerfil(@Body() dadosPerfil: PerfilCandidato): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.criarPerfil(dadosPerfil);
  }

  // Endpoint para buscar um perfil de candidato pelo ID
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do perfil de candidato' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de candidato encontrado',
    type: PerfilCandidato,
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil de candidato não encontrado',
  })
  async buscarPerfilPorId(@Param('id') id: number): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.buscarPerfilPorId(id);
  }

  // Endpoint para atualizar um perfil de candidato
  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID do perfil de candidato' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de candidato atualizado com sucesso',
    type: PerfilCandidato,
  })
  async atualizarPerfil(
    @Param('id') id: number,
    @Body() dadosAtualizacao: Partial<PerfilCandidato>,
  ): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.atualizarPerfil(id, dadosAtualizacao);
  }

  // Endpoint para remover um perfil de candidato pelo ID
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do perfil de candidato' })
  @ApiResponse({
    status: 204,
    description: 'Perfil de candidato removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil de candidato não encontrado',
  })
  async removerPerfil(@Param('id') id: number): Promise<void> {
    return this.perfilCandidatoService.removerPerfil(id);
  }

  // Endpoint para buscar múltiplos perfis de candidatos por IDs
  @Post('buscar-por-ids')
  @ApiResponse({
    status: 200,
    description: 'Lista de perfis de candidatos encontrados pelos IDs fornecidos',
    type: [PerfilCandidato],
  })
  async buscarCandidatosPorIds(@Body() ids: number[]): Promise<PerfilCandidato[]> {
    return this.perfilCandidatoService.findCandidatosByIds(ids);
  }
}
