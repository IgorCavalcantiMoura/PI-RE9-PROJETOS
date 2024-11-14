import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { PerfilCandidato } from '../../perfilCandidato/entities/perfilCandidato.entity'; // Importando PerfilCandidato
import { Projeto } from '../../projeto/entities/projeto.entity'; // Importando Projeto

@Entity({ name: 'tb_equipe' })
export class Equipe {
  @ApiProperty({ description: 'ID único da equipe', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome da equipe', example: 'Equipe de Desenvolvimento' })
  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @ApiProperty({
    description: 'Projetos associados à equipe',
    type: () => [Projeto],
    isArray: true,
  })
  @ManyToMany(() => Projeto, (projeto) => projeto.equipe)
  @JoinTable()
  projetos: Projeto[];  // Relacionamento com os projetos

  @ApiProperty({ description: 'Candidato associado à equipe', type: () => PerfilCandidato })
  @ManyToOne(() => PerfilCandidato, (candidato) => candidato.equipe)
  candidato: PerfilCandidato; // Relacionamento com o candidato

  @ApiProperty({ description: 'Função do candidato na equipe', example: 'Desenvolvedor Full Stack' })
  @Column({ type: 'varchar', length: 150 })
  funcao: string; // Função do candidato na equipe
}
