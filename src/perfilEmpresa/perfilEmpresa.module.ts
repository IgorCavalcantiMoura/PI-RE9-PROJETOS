import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilEmpresa } from "./entities/perfilEmpresa.entity";
import { PerfilEmpresaService } from "./services/perfilEmpresa.service";
import { PerfilEmpresaController } from "./controllers/perfilEmpresa.contreoller";

@Module({
imports: [TypeOrmModule.forFeature([PerfilEmpresa])],
providers: [PerfilEmpresaService],
controllers: [PerfilEmpresaController],
exports: [TypeOrmModule],
})
export class PerfilEmpresaModule { }