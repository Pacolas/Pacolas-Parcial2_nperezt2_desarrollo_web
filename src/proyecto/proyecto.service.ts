/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}
    async create(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.fechaFin< proyecto.fechaInicio){
            throw new BusinessLogicException("The project ends before it starts", BusinessError.PRECONDITION_FAILED);
        }
        return await this.proyectoRepository.save(proyecto);
    }
}
