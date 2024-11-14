import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilEmpresa } from '../entities/perfilEmpresa.entity';


@Injectable()
export class PerfilEmpresaService {
  constructor(
    @InjectRepository(PerfilEmpresa)
    private readonly perfilEmpresaRepository: Repository<PerfilEmpresa>,
  ) {}

  // Cria um novo perfil de empresa
  async criarPerfil(dadosPerfil: Partial<PerfilEmpresa>): Promise<PerfilEmpresa> {
    const perfil = this.perfilEmpresaRepository.create(dadosPerfil);
    return this.perfilEmpresaRepository.save(perfil);
  }

  // Busca um perfil de empresa pelo ID
  async buscarPerfilPorId(id: number): Promise<PerfilEmpresa> {
    const perfil = await this.perfilEmpresaRepository.findOne({
      where: { id },
      relations: ['projetos'], // Inclui os projetos associados ao perfil
    });
  
    if (!perfil) {
      throw new NotFoundException(`Perfil de empresa com ID ${id} não encontrado`);
    }
  
    return perfil;
  }

  // Atualiza as informações de um perfil de empresa
  async atualizarPerfil(id: number, dadosAtualizacao: Partial<PerfilEmpresa>): Promise<PerfilEmpresa> {
    const perfil = await this.buscarPerfilPorId(id);
    Object.assign(perfil, dadosAtualizacao);
    return this.perfilEmpresaRepository.save(perfil);
  }

  // Remove um perfil de empresa pelo ID
  async removerPerfil(id: number): Promise<void> {
    const resultado = await this.perfilEmpresaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Perfil de empresa com ID ${id} não encontrado`);
    }
  }

  // Retorna todos os perfis de empresa
  async listarPerfis(): Promise<PerfilEmpresa[]> {
    return this.perfilEmpresaRepository.find();
  }
}
