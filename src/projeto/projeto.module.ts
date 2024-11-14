import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Projeto } from "./entities/projeto.entity";
import { ProjetoService } from "./services/projeto.service";
import { ProjetoController } from "./controllers/projeto.controller";
import { PerfilEmpresaService } from "../perfilEmpresa/services/perfilEmpresa.service";
import { PerfilEmpresaModule } from "../perfilEmpresa/perfilEmpresa.module";

@Module({
imports: [TypeOrmModule.forFeature([Projeto]), PerfilEmpresaModule],
providers: [ProjetoService, PerfilEmpresaService],
controllers: [ProjetoController],
exports: [TypeOrmModule]
})
export class ProjetoModule { }