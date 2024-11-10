import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Empresa } from './empresas/entities/empresa.entity';
import { Candidato } from './candidatos/entities/candidato.entity';
import { EmpresasModule } from './empresas/empresas.module';
import { CandidatoModule } from './candidatos/candidatos.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_re9_projetos',
      entities: [Empresa, Candidato],
      synchronize: true,
    }),
    AuthModule,
    EmpresasModule,
    CandidatoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
