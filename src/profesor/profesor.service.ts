/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
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
        const grupos = ['TICSW', 'IMAGINE', 'COMIT'];
        if (!grupos.includes(profesor.grupo_investigacion)) {
          throw new BusinessLogicException(
            "El grupo asignado no es permitido",
            BusinessError.PRECONDITION_FAILED
          );
        }
      
        return await this.profesorRepository.save(profesor);
      }

      async delete(id: string) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ['propuestas']});
        if (!profesor) {
          throw new BusinessLogicException("El profesor con el id proporcionado no se encontró", BusinessError.NOT_FOUND);
        }
        const propuestas = profesor.propuestas.filter(propuesta => propuesta.proyecto !== null);
        if (propuestas.length > 0) {
          throw new BusinessLogicException(
            "No se puede eliminar el profesor porque tiene propuestas con proyectos asociados",
            BusinessError.PRECONDITION_FAILED
          );
        }
    
        await this.profesorRepository.remove(profesor);
      }
    
      async deleteByCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {cedula}, relations: ['propuestas']});
        if (!profesor) {
          throw new BusinessLogicException("El profesor con la cédula proporcionada no se encontró", BusinessError.NOT_FOUND);
        }
        const propuestas = profesor.propuestas.filter(propuesta => propuesta.proyecto !== null);
        if (propuestas.length > 0) {
          throw new BusinessLogicException(
            "No se puede eliminar el profesor porque tiene propuestas con proyectos asociados",
            BusinessError.PRECONDITION_FAILED
          );
        }
    
        await this.profesorRepository.remove(profesor);
      }
}
