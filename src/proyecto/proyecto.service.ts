/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}
    async create(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        return await this.proyectoRepository.save(proyecto);
    }
}
