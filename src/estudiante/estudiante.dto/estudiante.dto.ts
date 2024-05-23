/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class EstudianteDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly codigo: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly creditos: string;
    
}
