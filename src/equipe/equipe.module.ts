import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Equipe } from "./entities/equipe.entity";
import { PerfilCandidatoModule } from "../perfilCandidato/perfilCandidato.module";
import { ProjetoModule } from "../projeto/projeto.module";
import { EquipeService } from "./services/equipe.service";
import { PerfilCandidatoService } from "../perfilCandidato/services/perfilCandidato.service";
import { ProjetoService } from "../projeto/services/projeto.service";
import { EquipeController } from "./controllers/equipe.controller";
import { PerfilEmpresaModule } from "../perfilEmpresa/perfilEmpresa.module";
import { PerfilEmpresaService } from "../perfilEmpresa/services/perfilEmpresa.service";

@Module({
imports: [TypeOrmModule.forFeature([Equipe]), PerfilCandidatoModule, ProjetoModule, PerfilEmpresaModule],
providers: [EquipeService, PerfilCandidatoService, ProjetoService, PerfilEmpresaService],
controllers: [EquipeController],
exports: [TypeOrmModule]
})
export class EquipeModule { }