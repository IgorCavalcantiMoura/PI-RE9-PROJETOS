import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'tb_empresas' })
export class Empresa {
  @ApiProperty({ description: 'Identificador único da empresa', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Ltda',
  })
  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ unique: true })
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

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  data_criacao: Date;

  @ApiProperty({
    description: 'Data de atualização do registro',
    example: '2023-01-15T00:00:00Z',
  })
  @UpdateDateColumn()
  data_atualizacao: Date;
}
