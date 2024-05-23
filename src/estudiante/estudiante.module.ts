/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([EstudianteEntity])
    ],
    providers: [EstudianteService],
    controllers: [EstudianteController]
  })
export class EstudianteModule {}
