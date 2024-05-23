/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class ProfesorDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly codigo: number;
    
    @IsString()
    @IsNotEmpty()
    readonly grupo_investigacion: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;
}
