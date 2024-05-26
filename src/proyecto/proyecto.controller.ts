/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';
import { plainToInstance } from 'class-transformer';
import { ProyectoService } from './proyecto.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {} 
    @Post()
  async create(@Body() proyectoDto: ProyectoDto) {
    const propuesta: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
    return await this.proyectoService.create(propuesta);
  }

}
