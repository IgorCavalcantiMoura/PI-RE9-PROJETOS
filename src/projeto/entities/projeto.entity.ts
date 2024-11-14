import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PerfilEmpresa } from '../../perfilEmpresa/entities/perfilEmpresa.entity';
import { Equipe } from '../../equipe/entities/equipe.entity';

// Definindo o Enum para Status do Projeto
export enum StatusProjeto {
  PENDENTE = 'Pendente',
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDA = 'Concluída',
}

@Entity({ name: 'tb_projetos' })
export class Projeto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 150, nullable: false })
  nome: string;

  @ApiProperty()
  @IsOptional()
  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @ApiProperty({ enum: StatusProjeto })
  @Column({
    type: 'enum',
    enum: StatusProjeto,
    default: StatusProjeto.PENDENTE,
  })
  status: StatusProjeto;

  @ApiProperty()
  @CreateDateColumn()
  criadoEm: Date;

  @ApiProperty()
  @UpdateDateColumn()
  atualizadoEm: Date;

  @ApiProperty({ type: () => PerfilEmpresa })
  @ManyToOne(() => PerfilEmpresa, (empresa) => empresa.projetos, {
    onDelete: 'CASCADE',
  })
  responsavel: PerfilEmpresa;

  @ManyToMany(() => Equipe, (equipe) => equipe.projetos)
  equipe: Equipe[];  // Relacionamento com os projetos
}
