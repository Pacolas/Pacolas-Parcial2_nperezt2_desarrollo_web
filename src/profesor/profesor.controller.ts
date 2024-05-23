/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpCode, Param, UseInterceptors } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get(':profesorId')
  async findOne(@Param('profesorId') profesorId: string) {
    return await this.profesorService.findOne(profesorId);
  }

  @Delete('id/:profesorId')
  @HttpCode(204)
  async delete(@Param('profesorId') profesorId: string) {
    return await this.profesorService.delete(profesorId);
  }

  @Delete('cedula/:cedula')
  @HttpCode(204)
  async deleteByCedula(@Param('cedula') cedula: number) {
    return await this.profesorService.deleteByCedula(cedula);
  }
}
