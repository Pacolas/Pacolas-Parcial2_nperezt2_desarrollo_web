/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsUrl } from "class-validator";

/* eslint-disable prettier/prettier */
export class ProyectoDto {

    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;
    
    @IsUrl()
    @IsNotEmpty()
    readonly url: string;
}
