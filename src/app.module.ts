import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Empresa } from './empresas/entities/empresa.entity';
import { Candidato } from './candidatos/entities/candidato.entity';
import { EmpresasModule } from './empresas/empresas.module';
import { CandidatoModule } from './candidatos/candidatos.module';
import { PerfilCandidato } from './perfilCandidato/entities/perfilCandidato.entity';
import { PerfilEmpresa } from './perfilEmpresa/entities/perfilEmpresa.entity';
import { PerfilEmpresaModule } from './perfilEmpresa/perfilEmpresa.module';
import { PerfilCandidatoModule } from './perfilCandidato/perfilCandidato.module';
import { Equipe } from './equipe/entities/equipe.entity';
import { Projeto } from './projeto/entities/projeto.entity';
import { EquipeModule } from './equipe/equipe.module';
import { ProjetoModule } from './projeto/projeto.module';
import { AppController } from './app.controller';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_re9_projetos',
      entities: [Empresa, Candidato, PerfilCandidato, PerfilEmpresa, Equipe, Projeto],
      synchronize: true,
    }),
    AuthModule,
    EmpresasModule,
    CandidatoModule,
    PerfilEmpresaModule,
    PerfilCandidatoModule,
    EquipeModule,
    ProjetoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
