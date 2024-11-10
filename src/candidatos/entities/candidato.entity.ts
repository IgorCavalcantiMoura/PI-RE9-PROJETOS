import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'tb_candidatos' })
export class Candidato {
  @ApiProperty({ description: 'ID único do candidato' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do candidato', maxLength: 255 })
  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @ApiProperty({ description: 'Email único do candidato', maxLength: 255 })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column()
  senha: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.senha) {
      this.senha = await bcrypt.hash(this.senha, 10);
    }
  }

  async verifyPassword(senha: string): Promise<boolean> {
    return await bcrypt.compare(senha, this.senha);
  }

  @ApiProperty({ description: 'Data de criação do registro', type: Date })
  @CreateDateColumn()
  data_criacao: Date;

  @ApiProperty({ description: 'Data de atualização do registro', type: Date })
  @UpdateDateColumn()
  data_atualizacao: Date;
}
