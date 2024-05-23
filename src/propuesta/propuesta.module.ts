/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { PropuestaService } from './propuesta.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([PropuestaEntity])
    ],
    providers: [PropuestaService],
    controllers: []
  })
export class PropuestaModule {}
