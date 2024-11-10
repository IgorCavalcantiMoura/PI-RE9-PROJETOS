import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Empresa } from '../../empresas/entities/empresa.entity';


@Entity({ name: 'tb_perfil_empresa' })
export class PerfilEmpresa {
  
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único do perfil da empresa' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nome completo da empresa', example: 'Empresa Exemplo LTDA' })
  nomeCompleto: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'CNPJ da empresa', example: '12.345.678/0001-99' })
  cnpj: string;

  @Column()
  @ApiProperty({ description: 'Telefone principal da empresa', example: '(11) 1234-5678' })
  telefone: string;

  @Column()
  @ApiProperty({ description: 'Endereço da empresa', example: 'Rua Exemplo, 123' })
  endereco: string;

  @Column()
  @ApiProperty({ description: 'Cidade da empresa', example: 'São Paulo' })
  cidade: string;

  @Column()
  @ApiProperty({ description: 'Estado da empresa', example: 'SP' })
  estado: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'CEP da empresa', example: '01234-567' })
  cep: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Nome do responsável legal pela empresa', example: 'João da Silva' })
  responsavel: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Email do responsável legal pela empresa', example: 'responsavel@empresa.com' })
  emailResponsavel: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Número de registro estadual da empresa', example: '123456789' })
  inscricaoEstadual: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Número de funcionários na empresa', example: 50 })
  numeroFuncionarios: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Descrição da empresa', example: 'Empresa especializada em soluções de TI' })
  descricao: string;

  @OneToOne(() => Empresa, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'login_empresa_id' })
  @ApiProperty({ description: 'Login associado a este perfil', type: () => Empresa })
  Empresa: Empresa;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação do perfil', example: '2024-11-07T03:00:00.000Z' })
  dataCriacao: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Data da última atualização do perfil', example: '2024-11-07T03:00:00.000Z' })
  dataAtualizacao: Date;
}
