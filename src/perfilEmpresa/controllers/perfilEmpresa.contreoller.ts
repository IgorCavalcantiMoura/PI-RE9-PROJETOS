import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { PerfilEmpresa } from '../entities/perfilEmpresa.entity';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PerfilEmpresaService } from '../services/perfilEmpresa.service';

@ApiTags('Perfil Empresa')  // Define o grupo de endpoints no Swagger
@Controller('perfil-empresa')
export class PerfilEmpresaController {
  constructor(private readonly perfilEmpresaService: PerfilEmpresaService) {}

  // Endpoint para criar um novo perfil de empresa
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Perfil de empresa criado com sucesso',
    type: PerfilEmpresa,
  })
  async criarPerfil(@Body() dadosPerfil: Partial<PerfilEmpresa>): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.criarPerfil(dadosPerfil);
  }

  // Endpoint para buscar um perfil de empresa pelo ID
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do perfil de empresa' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de empresa encontrado',
    type: PerfilEmpresa,
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil de empresa não encontrado',
  })
  async buscarPerfilPorId(@Param('id') id: number): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.buscarPerfilPorId(id);
  }

  // Endpoint para atualizar um perfil de empresa
  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID do perfil de empresa' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de empresa atualizado com sucesso',
    type: PerfilEmpresa,
  })
  async atualizarPerfil(
    @Param('id') id: number,
    @Body() dadosAtualizacao: Partial<PerfilEmpresa>,
  ): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.atualizarPerfil(id, dadosAtualizacao);
  }

  // Endpoint para remover um perfil de empresa pelo ID
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do perfil de empresa' })
  @ApiResponse({
    status: 204,
    description: 'Perfil de empresa removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil de empresa não encontrado',
  })
  async removerPerfil(@Param('id') id: number): Promise<void> {
    return this.perfilEmpresaService.removerPerfil(id);
  }

  // Endpoint para listar todos os perfis de empresa
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de perfis de empresa',
    type: [PerfilEmpresa],
  })
  async listarPerfis(): Promise<PerfilEmpresa[]> {
    return this.perfilEmpresaService.listarPerfis();
  }
}
