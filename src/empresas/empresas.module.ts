import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { EmpresasService } from './services/empresa.service';
import { EmpresasController } from './controllers/empresa.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  providers: [EmpresasService],
  controllers: [EmpresasController],
  exports: [TypeOrmModule]
})
export class EmpresasModule {}
