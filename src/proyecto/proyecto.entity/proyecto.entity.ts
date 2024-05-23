/* eslint-disable prettier/prettier */
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from 'typeorm'; 
@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn('uuid') 
    id: Long; 
    
    @Column() 
    fechaInicio: Date; 
    
    @Column() 
    fechaFin: Date; 
    
    @Column() 
    url: string; 
    
    @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto) 
    @JoinColumn() 
    estudiante: EstudianteEntity; 

    @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto) 
    @JoinColumn() 
    propuesta: PropuestaEntity; 

 
    
    } 
    
    