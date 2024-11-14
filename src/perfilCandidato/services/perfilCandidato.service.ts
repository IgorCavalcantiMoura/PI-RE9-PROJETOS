import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilCandidato } from '../entities/perfilCandidato.entity';
import { In } from 'typeorm';



@Injectable()
export class PerfilCandidatoService {
  constructor(
    @InjectRepository(PerfilCandidato)
    private readonly perfilCandidatoRepository: Repository<PerfilCandidato>,
  ) {}

  // Cria um novo perfil de candidato
  async criarPerfil(dadosPerfil: PerfilCandidato): Promise<PerfilCandidato> {
    const perfil = this.perfilCandidatoRepository.create(dadosPerfil);
    return this.perfilCandidatoRepository.save(perfil);
  }

  // Busca um perfil de candidato pelo ID
  async buscarPerfilPorId(id: number): Promise<PerfilCandidato> {
    const perfil = await this.perfilCandidatoRepository.findOne({ where: { id } });
    if (!perfil) {
      throw new NotFoundException(`Perfil de candidato com ID ${id} não encontrado`);
    }
    return perfil;
  }

  // Atualiza as informações de um perfil de candidato
  async atualizarPerfil(id: number, dadosAtualizacao: Partial<PerfilCandidato>): Promise<PerfilCandidato> {
    const perfil = await this.buscarPerfilPorId(id);
    Object.assign(perfil, dadosAtualizacao);
    return this.perfilCandidatoRepository.save(perfil);
  }

  // Remove um perfil de candidato pelo ID
  async removerPerfil(id: number): Promise<void> {
    const resultado = await this.perfilCandidatoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Perfil de candidato com ID ${id} não encontrado`);
    }
  }

  async findCandidatosByIds(ids: number[]): Promise<PerfilCandidato[]> {
    return await this.perfilCandidatoRepository.findBy({ id: In(ids) });
  }
}
