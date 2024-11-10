import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmpresasService } from '../services/empresa.service';
import { Empresa } from '../entities/empresa.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Empresas')
@ApiBearerAuth() // Informa que as rotas estão protegidas por autenticação JWT
@Controller('empresas')

export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova empresa' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Empresa criada com sucesso.',
    type: Empresa,
  })
  @ApiBody({ description: 'Dados para criação da empresa', type: Empresa })
  async create(@Body() empresa: Partial<Empresa>): Promise<Empresa> {
    return this.empresasService.create(empresa);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todas as empresas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de todas as empresas.',
    type: [Empresa],
  })
  async findAll(): Promise<Empresa[]> {
    return this.empresasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma empresa pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa encontrada com sucesso.',
    type: Empresa,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  @ApiParam({ name: 'id', description: 'ID da empresa', example: 1 })
  async findById(@Param('id') id: number): Promise<Empresa> {
    return this.empresasService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma empresa pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa atualizada com sucesso.',
    type: Empresa,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  @ApiParam({ name: 'id', description: 'ID da empresa', example: 1 })
  @ApiBody({ description: 'Dados atualizados da empresa', type: Empresa })
  async update(
    @Param('id') id: number,
    @Body() empresaAtualizada: Partial<Empresa>,
  ): Promise<Empresa> {
    return this.empresasService.update(id, empresaAtualizada);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta uma empresa pelo ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Empresa deletada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  @ApiParam({ name: 'id', description: 'ID da empresa', example: 1 })
  async delete(@Param('id') id: number): Promise<void> {
    return this.empresasService.delete(id);
  }
}
