import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CandidatoService } from '../services/candidato.service';
import { Candidato } from '../entities/candidato.entity';

@ApiTags('Candidatos')
@ApiBearerAuth()
@Controller('candidatos')

export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @ApiOperation({ summary: 'Cadastrar um novo candidato' })
  @ApiResponse({
    status: 201,
    description: 'Candidato cadastrado com sucesso',
    type: Candidato,
  })
  @Post('cadastrar')
  async cadastrar(
    @Body() candidatoData: Omit<Candidato, 'id'>,
  ): Promise<Candidato> {
    return this.candidatoService.criarCandidato(candidatoData);
  }

  @ApiOperation({ summary: 'Buscar todos os candidatos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os candidatos',
    type: [Candidato],
  })
  @Get()
  async buscarTodos(): Promise<Candidato[]> {
    return this.candidatoService.buscarTodos();
  }

  @ApiOperation({ summary: 'Buscar candidato por ID' })
  @ApiParam({ name: 'id', description: 'ID do candidato' })
  @ApiResponse({
    status: 200,
    description: 'Candidato encontrado',
    type: Candidato,
  })
  @ApiResponse({ status: 404, description: 'Candidato não encontrado' })
  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Candidato> {
    return this.candidatoService.buscarPorId(id);
  }

  @ApiOperation({ summary: 'Deletar candidato por ID' })
  @ApiParam({ name: 'id', description: 'ID do candidato' })
  @ApiResponse({ status: 200, description: 'Candidato deletado com sucesso' })
  @Delete(':id')
  async deletarCandidato(@Param('id') id: number): Promise<void> {
    await this.candidatoService.deletarCandidato(id);
  }

  
}
