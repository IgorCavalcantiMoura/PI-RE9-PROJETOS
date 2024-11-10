// src/auth/guards/candidato-local-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CandidatoLocalAuthGuard extends AuthGuard('candidato-local') {}
