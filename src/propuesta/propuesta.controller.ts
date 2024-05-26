/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { PropuestaEntity } from './propuesta.entity';
import { plainToInstance } from 'class-transformer';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';

@Controller('propuesta')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
    
    constructor(private readonly propuestaService: PropuestaService) {} 
    @Get()
    async findAll() {
        return await this.propuestaService.findAll();
    }
    @Post()
  async create(@Body() propuestaDto: PropuestaDto) {
    const propuesta: PropuestaEntity = plainToInstance(PropuestaEntity, propuestaDto);
    return await this.propuestaService.create(propuesta);
  }
  @Get(':propuestaId')
  async findOne(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.findOne(propuestaId);
  }

  @Delete(':propuestaId')
  @HttpCode(204)
  async delete(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.delete(propuestaId);
  }

}
