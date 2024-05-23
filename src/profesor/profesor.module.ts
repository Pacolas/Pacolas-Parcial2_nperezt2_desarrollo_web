/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([ProfesorEntity])
    ],
    providers: [ProfesorService],
    controllers: []
  })
export class ProfesorModule {}
