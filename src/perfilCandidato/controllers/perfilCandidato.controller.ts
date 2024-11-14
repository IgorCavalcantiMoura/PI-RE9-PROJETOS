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
import { PerfilCandidatoService } from '../services/perfilCandidato.service';
import { PerfilCandidato } from '../entities/perfilCandidato.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Perfil Candidato') // Define o grupo de endpoints no Swagger
@Controller('perfil-candidato')
export class PerfilCandidatoController {
  constructor(
    private readonly perfilCandidatoService: PerfilCandidatoService,
  ) {}

  // Endpoint para criar um novo perfil de candidato
  @Post()
  @ApiOperation({ summary: 'Criar um novo perfil de candidato' })
  @ApiResponse({
    status: 201,
    description: 'Perfil de candidato criado com sucesso',
    type: PerfilCandidato,
  })
  async criarPerfil(
    @Body() dadosPerfil: PerfilCandidato,
  ): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.criarPerfil(dadosPerfil);
  }

  // Endpoint para buscar um perfil de candidato pelo ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar perfil de candidato por ID' })
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
    const perfil = await this.perfilCandidatoService.buscarPerfilPorId(id);
    if (!perfil) {
      throw new NotFoundException(
        `Perfil de candidato com ID ${id} não encontrado`,
      );
    }
    return perfil;
  }

  // Endpoint para atualizar um perfil de candidato
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar perfil de candidato' })
  @ApiResponse({
    status: 200,
    description: 'Perfil de candidato atualizado com sucesso',
    type: PerfilCandidato,
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil de candidato não encontrado',
  })
  async atualizarPerfil(
    @Param('id') id: number,
    @Body() dadosAtualizacao: Partial<PerfilCandidato>,
  ): Promise<PerfilCandidato> {
    return this.perfilCandidatoService.atualizarPerfil(id, dadosAtualizacao);
  }

  // Endpoint para remover um perfil de candidato
  @Delete(':id')
  @ApiOperation({ summary: 'Remover perfil de candidato' })
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
}
