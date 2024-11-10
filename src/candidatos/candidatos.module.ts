import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Candidato } from "./entities/candidato.entity";
import { CandidatoService } from "./services/candidato.service";
import { CandidatoController } from "./controllers/candidato.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Candidato])],
    providers: [CandidatoService],
    controllers: [CandidatoController],
    exports: [TypeOrmModule]
  })
  export class CandidatoModule {}