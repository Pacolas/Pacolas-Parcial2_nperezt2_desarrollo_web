/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}
    async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo.toString().length <10){
            throw new BusinessLogicException("The estudiante code is not valid.", BusinessError.PRECONDITION_FAILED);
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findOne(id: string): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}, relations: ["proyecto"] } );
        if (!estudiante)
          throw new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND);
        return estudiante;
    }

}
