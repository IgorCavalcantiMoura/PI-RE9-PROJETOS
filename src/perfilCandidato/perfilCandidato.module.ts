import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilCandidato } from "./entities/perfilCandidato.entity";
import { PerfilCandidatoService } from "./services/perfilCandidato.service";
import { PerfilCandidatoController } from "./controllers/perfilCandidato.controller";

@Module({
imports: [TypeOrmModule.forFeature([PerfilCandidato])],
providers: [PerfilCandidatoService],
controllers: [PerfilCandidatoController],
exports: [TypeOrmModule],
})
export class PerfilCandidatoModule { }
