import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PerfilEmpresaService } from '../services/perfilEmpresa.service';
import { PerfilEmpresa } from '../entities/perfilEmpresa.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Perfil Empresa') // Define o grupo de endpoints no Swagger
@Controller('perfil-empresa')
export class PerfilEmpresaController {
  constructor(private readonly perfilEmpresaService: PerfilEmpresaService) {}

  // Endpoint para criar um novo perfil de empresa
  @Post()
  @ApiOperation({ summary: 'Criar um novo perfil de empresa' })
  @ApiResponse({
    status: 201,
    description: 'Perfil de empresa criado com sucesso',
    type: PerfilEmpresa,
  })
  async criarPerfil(
    @Body() dadosPerfil: PerfilEmpresa,
  ): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.criarPerfil(dadosPerfil);
  }

  // Endpoint para buscar um perfil de empresa pelo ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar perfil de empresa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de empresa encontrado',
    type: PerfilEmpresa,
  })
  @ApiResponse({ status: 404, description: 'Perfil de empresa não encontrado' })
  async buscarPerfilPorId(@Param('id') id: number): Promise<PerfilEmpresa> {
    const perfil = await this.perfilEmpresaService.buscarPerfilPorId(id);
    if (!perfil) {
      throw new NotFoundException(
        `Perfil de empresa com ID ${id} não encontrado`,
      );
    }
    return perfil;
  }

  // Endpoint para atualizar um perfil de empresa
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar perfil de empresa' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de empresa atualizado com sucesso',
    type: PerfilEmpresa,
  })
  @ApiResponse({ status: 404, description: 'Perfil de empresa não encontrado' })
  async atualizarPerfil(
    @Param('id') id: number,
    @Body() dadosAtualizacao: Partial<PerfilEmpresa>,
  ): Promise<PerfilEmpresa> {
    return this.perfilEmpresaService.atualizarPerfil(id, dadosAtualizacao);
  }

  // Endpoint para remover um perfil de empresa
  @Delete(':id')
  @ApiOperation({ summary: 'Remover perfil de empresa' })
  @ApiResponse({
    status: 204,
    description: 'Perfil de empresa removido com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Perfil de empresa não encontrado' })
  async removerPerfil(@Param('id') id: number): Promise<void> {
    await this.perfilEmpresaService.removerPerfil(id);
  }
}
