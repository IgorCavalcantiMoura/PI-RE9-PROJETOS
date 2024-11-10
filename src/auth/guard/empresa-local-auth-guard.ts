// src/auth/guards/empresa-local-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmpresaLocalAuthGuard extends AuthGuard('empresa-local') {}
