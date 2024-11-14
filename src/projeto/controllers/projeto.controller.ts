import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Projeto } from '../entities/projeto.entity';
import { StatusProjeto } from '../entities/projeto.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjetoService } from '../services/projeto.service';

@ApiTags('Projetos')
@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @ApiOperation({ summary: 'Criar um novo projeto' })
  @ApiResponse({ status: 201, description: 'Projeto criado com sucesso', type: Projeto })
  @Post()
  async create(
    @Body('nome') nome: string,
    @Body('descricao') descricao: string,
    @Body('status') status: StatusProjeto,
    @Body('responsavelId') responsavelId: number,
  ): Promise<Projeto> {
    return this.projetoService.create(nome, descricao, status, responsavelId);
  }

  @ApiOperation({ summary: 'Buscar todos os projetos' })
  @ApiResponse({ status: 200, description: 'Lista de projetos', type: [Projeto] })
  @Get()
  async findAll(): Promise<Projeto[]> {
    return this.projetoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um projeto por ID' })
  @ApiResponse({ status: 200, description: 'Projeto encontrado', type: Projeto })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Projeto> {
    return this.projetoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um projeto' })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso', type: Projeto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('nome') nome?: string,
    @Body('descricao') descricao?: string,
    @Body('status') status?: StatusProjeto,
    @Body('responsavelId') responsavelId?: number,
  ): Promise<Projeto> {
    return this.projetoService.update(id, nome, descricao, status, responsavelId);
  }

  @ApiOperation({ summary: 'Deletar um projeto' })
  @ApiResponse({ status: 200, description: 'Projeto deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.projetoService.delete(id);
  }

  @ApiOperation({ summary: 'Atualizar o status de um projeto' })
  @ApiResponse({ status: 200, description: 'Status do projeto atualizado', type: Projeto })
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: StatusProjeto,
  ): Promise<Projeto> {
    return this.projetoService.updateStatus(id, status);
  }
}
