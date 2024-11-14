import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Empresa } from '../../empresas/entities/empresa.entity';
import { Candidato } from '../../candidatos/entities/candidato.entity';
import { PerfilCandidato } from '../../perfilCandidato/entities/perfilCandidato.entity';
import { PerfilEmpresa } from '../../perfilEmpresa/entities/perfilEmpresa.entity';
import { Equipe } from '../../equipe/entities/equipe.entity';
import { Projeto } from '../../projeto/entities/projeto.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_re9_projetos',
      entities: [
        Empresa,
        Candidato,
        PerfilCandidato,
        PerfilEmpresa,
        Equipe,
        Projeto,
      ],
      synchronize: true,
    };
  }
}
