import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PerfilCandidatoService } from '../services/perfilCandidato.service';
import { PerfilCandidato } from '../entities/perfilCandidato.entity';


@Controller('perfil-candidato')
export class PerfilCandidatoController {
  constructor(private readonly perfilCandidatoService: PerfilCandidatoService) {}

  // Endpoint para criar um novo perfil de candidato
  @Post()
  async criarPerfil(@Body() dadosPerfil: PerfilCandidato): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.criarPerfil(dadosPerfil);
  }

  // Endpoint para buscar um perfil de candidato pelo ID
  @Get(':id')
  async buscarPerfilPorId(@Param('id') id: number): Promise<PerfilCandidato> {
    const perfil = await this.perfilCandidatoService.buscarPerfilPorId(id);
    if (!perfil) {
      throw new NotFoundException(`Perfil de candidato com ID ${id} não encontrado`);
    }
    return perfil;
  }

  // Endpoint para atualizar um perfil de candidato
  @Put(':id')
  async atualizarPerfil(
    @Param('id') id: number,
    @Body() dadosAtualizacao: Partial<PerfilCandidato>,
  ): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.atualizarPerfil(id, dadosAtualizacao);
  }

  // Endpoint para remover um perfil de candidato
  @Delete(':id')
  async removerPerfil(@Param('id') id: number): Promise<void> {
    return this.perfilCandidatoService.removerPerfil(id);
  }
}
