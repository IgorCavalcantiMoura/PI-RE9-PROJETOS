import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Candidato } from '../../candidatos/entities/candidato.entity';


@Entity('perfil_candidato')
export class PerfilCandidato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nomeCompleto: string;

  @Column()
  idade: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 15, nullable: true })
  telefone: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @Column('simple-array', { nullable: true })
  habilidades: string[];

  @Column({ nullable: true })
  experienciaProfissional: string;

  @Column({ nullable: true })
  formacaoAcademica: string;

  @Column({ nullable: true })
  cidade: string;

  @OneToOne(() => Candidato)
  @JoinColumn()
  candidato: Candidato;
}
