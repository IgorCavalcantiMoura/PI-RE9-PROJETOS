import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Candidato } from '../../candidatos/entities/candidato.entity';
import { Equipe } from '../../equipe/entities/equipe.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('perfil_candidato')
export class PerfilCandidato {
  @ApiProperty({ description: 'Identificador único do perfil do candidato' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome completo do candidato', maxLength: 100 })
  @Column({ length: 100 })
  nomeCompleto: string;

  @ApiProperty({ description: 'Idade do candidato' })
  @Column()
  idade: number;

  @ApiProperty({
    description: 'Endereço de e-mail do candidato',
    maxLength: 100,
  })
  @Column({ length: 100 })
  email: string;

  @ApiProperty({
    description: 'Número de telefone do candidato',
    maxLength: 15,
    required: false,
  })
  @Column({ length: 15, nullable: true })
  telefone: string;

  @ApiProperty({ description: 'Breve biografia do candidato', required: false })
  @Column({ type: 'text', nullable: true })
  biografia: string;

  @ApiProperty({
    description: 'Lista de habilidades do candidato',
    required: false,
    isArray: true,
  })
  @Column('simple-array', { nullable: true })
  habilidades: string[];

  @ApiProperty({
    description: 'Experiência profissional do candidato',
    required: false,
  })
  @Column({ nullable: true })
  experienciaProfissional: string;

  @ApiProperty({
    description: 'Formação acadêmica do candidato',
    required: false,
  })
  @Column({ nullable: true })
  formacaoAcademica: string;

  @ApiProperty({
    description: 'Cidade de residência do candidato',
    required: false,
  })
  @Column({ nullable: true })
  cidade: string;

  @ApiProperty({
    description: 'Candidato associado a este perfil',
    type: () => Candidato,
  })
  @OneToOne(() => Candidato)
  @JoinColumn()
  candidato: Candidato;

  @ApiProperty({
    description: 'Equipe associada a este perfil',
    type: () => Equipe,
  })
  @OneToOne(() => Equipe, { onDelete: 'CASCADE', eager: true })
  equipe: Equipe;
}
