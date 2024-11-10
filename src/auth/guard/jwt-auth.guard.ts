import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmpresaJwtAuthGuard extends AuthGuard('empresa-jwt') {}

@Injectable()
export class CandidatoJwtAuthGuard extends AuthGuard('candidato-jwt') {}
