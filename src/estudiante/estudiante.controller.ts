/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Controller('estudiante')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}
    @Post()
    async create(@Body() estudianteDto: EstudianteDto) {
        const estudiante: EstudianteEntity = plainToInstance (EstudianteEntity, estudianteDto);
        return await this.estudianteService.create(estudiante);
    }
    @Get(':estudianteId')
    async findOne(@Param('estudianteId') estudianteId: string) {
    return await this.estudianteService.findOne(estudianteId);
  }
}
