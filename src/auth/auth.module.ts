import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { EmpresaJwtStrategy } from './strategy/empresa-jwt.strategy';
import { CandidatoJwtStrategy } from './strategy/candidato-jwt.strategy';
import { EmpresaAuthController } from './controllers/empresa-auth.controller';
import { CandidatoAuthController } from './controllers/candidato-auth.controller';

import { EmpresasService } from '../empresas/services/empresa.service';
import { CandidatoService } from '../candidatos/services/candidato.service';
import { EmpresaLocalStrategy } from './strategy/empresa-local.strategy';
import { CandidatoLocalStrategy } from './strategy/candidato-local.strategy';
import { EmpresaLocalAuthGuard } from './guard/empresa-local-auth-guard';
import { CandidatoLocalAuthGuard } from './guard/candidato-local-auth-guard';
import { CandidatoJwtAuthGuard, EmpresaJwtAuthGuard } from './guard/jwt-auth.guard';

import { EmpresasModule } from '../empresas/empresas.module';
import { CandidatoModule } from '../candidatos/candidatos.module';
import { EmpresaAuthService } from './services/empresa-auth.service';
import { CandidatoAuthService } from './services/candidato-auth.service';

@Module({
  imports: [
    EmpresasModule,
    CandidatoModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    EmpresasService,
    CandidatoService,
    EmpresaLocalStrategy,
    CandidatoLocalStrategy,
    EmpresaJwtStrategy,
    CandidatoJwtStrategy,
    EmpresaLocalAuthGuard,
    CandidatoLocalAuthGuard,
    EmpresaJwtAuthGuard,
    CandidatoJwtAuthGuard,
    EmpresaAuthService,
    CandidatoAuthService
  ],
  controllers: [EmpresaAuthController, CandidatoAuthController],
  exports: [EmpresaAuthService, CandidatoAuthService],
})
export class AuthModule {}
