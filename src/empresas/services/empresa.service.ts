import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';


@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(empresa: Partial<Empresa>): Promise<Empresa> {
    const newEmpresa = this.empresaRepository.create(empresa);
    return this.empresaRepository.save(newEmpresa);
  }

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find();
  }

  async findById(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({ where: { id } });
    if (!empresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
    return empresa;
  }

  // Método para buscar uma empresa pelo email
  async findByEmail(email: string): Promise<Empresa | undefined> {
    return await this.empresaRepository.findOne({ where: { email } });
  }

  async update(id: number, empresaAtualizada: Partial<Empresa>): Promise<Empresa> {
    await this.findById(id); // Verifica se a empresa existe
    await this.empresaRepository.update(id, empresaAtualizada);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const empresa = await this.findById(id);
    await this.empresaRepository.remove(empresa);
  }
}
