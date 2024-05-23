/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ){}
    async create(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        return await this.propuestaRepository.save(propuesta);
    }
    async findOne(id: string): Promise<PropuestaEntity> {
        const profesor: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ["profesor", "proyecto"] } );
        if (!profesor)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
    
        return profesor;
    }
    async findAll(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["profesor","proyecto"] });
    }
    async delete(id: string) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id}});
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.propuestaRepository.remove(propuesta);
    }

}
