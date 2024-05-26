/* eslint-disable prettier/prettier */
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn('uuid') 
    id: string; 
    
    @Column() 
    nombre: string; 
    
    @Column() 
    codigo: number; 
    
    @Column() 
    creditos: number; 

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante) 
    @JoinColumn() 
    proyecto: ProyectoEntity; 
    
    } 
    
    