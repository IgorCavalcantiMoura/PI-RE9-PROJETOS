import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipe } from '../entities/equipe.entity';
import { PerfilCandidato } from '../../perfilCandidato/entities/perfilCandidato.entity';
import { Projeto } from '../../projeto/entities/projeto.entity';

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(Equipe)
    private equipeRepository: Repository<Equipe>,
  ) {}

  // Método para criar uma equipe com múltiplos membros
  async criarEquipe(
    nomeEquipe: string,
    candidatos: PerfilCandidato[],
    projetos: Projeto[],
    funcoes: string[],
  ): Promise<Equipe[]> {
    if (candidatos.length !== funcoes.length) {
      throw new Error('A quantidade de candidatos e funções deve ser igual');
    }

    const equipes = [];
    for (let i = 0; i < candidatos.length; i++) {
      const equipe = new Equipe();
      equipe.nome = nomeEquipe;
      equipe.candidato = candidatos[i];
      equipe.funcao = funcoes[i];
      equipe.projetos = projetos;
      equipes.push(await this.equipeRepository.save(equipe));
    }

    return equipes;
  }

  // Método para buscar equipes associadas a um projeto específico
  async buscarEquipesPorProjeto(projetoId: number): Promise<Equipe[]> {
    return await this.equipeRepository.find({
      where: { projetos: { id: projetoId } },
      relations: ['projetos', 'candidato'],
    });
  }

  // Método para adicionar um membro a uma equipe
  async adicionarMembro(
    equipeId: number,
    candidato: PerfilCandidato,
    funcao: string,
  ): Promise<Equipe> {
    const equipe = await this.equipeRepository.findOne({
      where: { id: equipeId },
      relations: ['projetos', 'candidato'],
    });

    if (!equipe) {
      throw new NotFoundException('Equipe não encontrada');
    }

    const novoMembro = new Equipe();
    novoMembro.nome = equipe.nome;
    novoMembro.candidato = candidato;
    novoMembro.funcao = funcao;
    novoMembro.projetos = equipe.projetos;

    return await this.equipeRepository.save(novoMembro);
  }

  // Método para remover um membro específico da equipe
  async removerMembro(equipeId: number, candidatoId: number): Promise<void> {
    const membro = await this.equipeRepository.findOne({
      where: { id: equipeId, candidato: { id: candidatoId } },
    });

    if (!membro) {
      throw new NotFoundException('Membro da equipe não encontrado');
    }

    await this.equipeRepository.remove(membro);
  }

  // Método para atualizar a função de um membro específico
  async atualizarFuncaoMembro(
    equipeId: number,
    candidatoId: number,
    novaFuncao: string,
  ): Promise<Equipe> {
    const membro = await this.equipeRepository.findOne({
      where: { id: equipeId, candidato: { id: candidatoId } },
      relations: ['candidato'],
    });

    if (!membro) {
      throw new NotFoundException('Membro da equipe não encontrado');
    }

    membro.funcao = novaFuncao;
    return await this.equipeRepository.save(membro);
  }

  // Método para deletar uma equipe
  async deletarEquipe(equipeId: number): Promise<void> {
    const equipe = await this.equipeRepository.findOne({ where: { id: equipeId } });

    if (!equipe) {
      throw new NotFoundException('Equipe não encontrada');
    }

    await this.equipeRepository.remove(equipe);
  }
}
