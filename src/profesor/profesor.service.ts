/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ){}
    async findAll(): Promise<ProfesorEntity[]> {
        return await this.profesorRepository.find({ relations: ["propuestas"] });
    }
    async findOne(id: string): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuestas"] } );
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
    
        return profesor;
    }
    async create(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        return await this.profesorRepository.save(profesor);
    }

    async delete(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.profesorRepository.remove(profesor);
    }
    async deleteByCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given cedula was not found", BusinessError.NOT_FOUND);
      
        await this.profesorRepository.remove(profesor);
    }
}
