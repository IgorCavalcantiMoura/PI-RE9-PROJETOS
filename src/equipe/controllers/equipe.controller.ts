import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { EquipeService } from '../services/equipe.service';
import { Equipe } from '../entities/equipe.entity';
import { PerfilCandidato } from '../../perfilCandidato/entities/perfilCandidato.entity';
import { Projeto } from '../../projeto/entities/projeto.entity';

@Controller('equipes')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  // Cria uma nova equipe
  @Post()
  @ApiOperation({ summary: 'Cria uma nova equipe' })
  @ApiResponse({
    status: 201,
    description: 'Equipe criada com sucesso',
    type: Equipe,
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiBody({
    description: 'Dados necessários para criar uma nova equipe',
    type: Equipe,
  })
  async criarEquipe(
    @Body('nome') nomeEquipe: string,
    @Body('candidatos') candidatos: PerfilCandidato[],
    @Body('projetos') projetos: Projeto[],
    @Body('funcoes') funcoes: string[],
  ) {
    try {
      return await this.equipeService.criarEquipe(
        nomeEquipe,
        candidatos,
        projetos,
        funcoes,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Busca equipes associadas a um projeto específico
  @Get('projeto/:projetoId')
  @ApiOperation({ summary: 'Busca equipes associadas a um projeto' })
  @ApiResponse({
    status: 200,
    description: 'Equipes encontradas',
    type: [Equipe],
  })
  @ApiParam({
    name: 'projetoId',
    description: 'ID do projeto',
    type: Number,
  })
  async buscarEquipesPorProjeto(@Param('projetoId') projetoId: number) {
    return await this.equipeService.buscarEquipesPorProjeto(projetoId);
  }

  // Adiciona um membro a uma equipe
  @Post(':equipeId/membros')
  @ApiOperation({ summary: 'Adiciona um membro a uma equipe' })
  @ApiResponse({ status: 200, description: 'Membro adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiParam({
    name: 'equipeId',
    description: 'ID da equipe',
    type: Number,
  })
  @ApiBody({
    description: 'Dados do candidato e da função a ser atribuída',
    type: PerfilCandidato,
  })
  async adicionarMembro(
    @Param('equipeId') equipeId: number,
    @Body('candidato') candidato: PerfilCandidato,
    @Body('funcao') funcao: string,
  ) {
    return await this.equipeService.adicionarMembro(
      equipeId,
      candidato,
      funcao,
    );
  }

  // Remove um membro de uma equipe
  @Delete(':equipeId/membros/:candidatoId')
  @ApiOperation({ summary: 'Remove um membro de uma equipe' })
  @ApiResponse({ status: 200, description: 'Membro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Membro ou equipe não encontrado' })
  @ApiParam({
    name: 'equipeId',
    description: 'ID da equipe',
    type: Number,
  })
  @ApiParam({
    name: 'candidatoId',
    description: 'ID do candidato',
    type: Number,
  })
  async removerMembro(
    @Param('equipeId') equipeId: number,
    @Param('candidatoId') candidatoId: number,
  ) {
    try {
      await this.equipeService.removerMembro(equipeId, candidatoId);
      return { message: 'Membro removido com sucesso' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Atualiza a função de um membro na equipe
  @Patch(':equipeId/membros/:candidatoId')
  @ApiOperation({ summary: 'Atualiza a função de um membro na equipe' })
  @ApiResponse({ status: 200, description: 'Função do membro atualizada' })
  @ApiResponse({ status: 404, description: 'Equipe ou membro não encontrado' })
  @ApiParam({
    name: 'equipeId',
    description: 'ID da equipe',
    type: Number,
  })
  @ApiParam({
    name: 'candidatoId',
    description: 'ID do candidato',
    type: Number,
  })
  @ApiBody({
    description: 'Nova função a ser atribuída ao membro',
    type: String,
  })
  async atualizarFuncaoMembro(
    @Param('equipeId') equipeId: number,
    @Param('candidatoId') candidatoId: number,
    @Body('novaFuncao') novaFuncao: string,
  ) {
    return await this.equipeService.atualizarFuncaoMembro(
      equipeId,
      candidatoId,
      novaFuncao,
    );
  }

  // Deleta uma equipe
  @Delete(':equipeId')
  @ApiOperation({ summary: 'Deleta uma equipe' })
  @ApiResponse({ status: 200, description: 'Equipe deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Equipe não encontrada' })
  @ApiParam({
    name: 'equipeId',
    description: 'ID da equipe a ser deletada',
    type: Number,
  })
  async deletarEquipe(@Param('equipeId') equipeId: number) {
    try {
      await this.equipeService.deletarEquipe(equipeId);
      return { message: 'Equipe deletada com sucesso' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
