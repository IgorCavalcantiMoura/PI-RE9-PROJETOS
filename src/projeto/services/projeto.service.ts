import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projeto, StatusProjeto } from '../entities/projeto.entity';
import { PerfilEmpresa } from '../../perfilEmpresa/entities/perfilEmpresa.entity';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private readonly projetoRepository: Repository<Projeto>,
    @InjectRepository(PerfilEmpresa)
    private readonly perfilEmpresaRepository: Repository<PerfilEmpresa>,
  ) {}

  // Método para criar um novo projeto
  async create(nome: string, descricao: string, status: StatusProjeto, responsavelId: number): Promise<Projeto> {
    const responsavel = await this.perfilEmpresaRepository.findOne({ where: { id: responsavelId } });
    if (!responsavel) {
      throw new NotFoundException(`Responsável com ID ${responsavelId} não encontrado`);
    }

    const projeto = this.projetoRepository.create({
      nome,
      descricao,
      status,
      responsavel,
    });
    return await this.projetoRepository.save(projeto);
  }

  // Método para listar todos os projetos
  async findAll(): Promise<Projeto[]> {
    return await this.projetoRepository.find({
      relations: ['responsavel'],
    });
  }

  // Método para buscar um projeto específico pelo ID
  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetoRepository.findOne({
      where: { id },
      relations: ['responsavel'],
    });
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }
    return projeto;
  }

  // Método para atualizar dados do projeto pelo ID
  async update(id: number, nome?: string, descricao?: string, status?: StatusProjeto, responsavelId?: number): Promise<Projeto> {
    const projeto = await this.findOne(id);

    if (nome) projeto.nome = nome;
    if (descricao) projeto.descricao = descricao;
    if (status) projeto.status = status;

    if (responsavelId) {
      const responsavel = await this.perfilEmpresaRepository.findOne({ where: { id: responsavelId } });
      if (!responsavel) {
        throw new NotFoundException(`Responsável com ID ${responsavelId} não encontrado`);
      }
      projeto.responsavel = responsavel;
    }

    return await this.projetoRepository.save(projeto);
  }

  // Método para deletar um projeto
  async delete(id: number): Promise<void> {
    const projeto = await this.findOne(id);
    await this.projetoRepository.remove(projeto);
  }

  // Método para atualizar apenas o status do projeto
  async updateStatus(id: number, status: StatusProjeto): Promise<Projeto> {
    const projeto = await this.findOne(id);
    projeto.status = status;
    return await this.projetoRepository.save(projeto);
  }
}
