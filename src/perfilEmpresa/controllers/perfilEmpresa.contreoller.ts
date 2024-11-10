import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PerfilEmpresaService } from '../services/perfilEmpresa.service';
import { PerfilEmpresa } from '../entities/perfilEmpresa.entity';


@Controller('perfil-empresa')
export class PerfilEmpresaController {
  constructor(private readonly perfilEmpresaService: PerfilEmpresaService) {}

  // Endpoint para criar um novo perfil de empresa
  @Post()
  async criarPerfil(@Body() dadosPerfil: PerfilEmpresa): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.criarPerfil(dadosPerfil);
  }

  // Endpoint para buscar um perfil de empresa pelo ID
  @Get(':id')
  async buscarPerfilPorId(@Param('id') id: number): Promise<PerfilEmpresa> {
    const perfil = await this.perfilEmpresaService.buscarPerfilPorId(id);
    if (!perfil) {
      throw new NotFoundException(`Perfil de empresa com ID ${id} não encontrado`);
    }
    return perfil;
  }

  // Endpoint para atualizar um perfil de empresa
  @Put(':id')
  async atualizarPerfil(
    @Param('id') id: number,
    @Body() dadosAtualizacao: Partial<PerfilEmpresa>,
  ): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.atualizarPerfil(id, dadosAtualizacao);
  }

  // Endpoint para remover um perfil de empresa
  @Delete(':id')
  async removerPerfil(@Param('id') id: number): Promise<void> {
    await this.perfilEmpresaService.removerPerfil(id);
  }
}
