/* eslint-disable prettier/prettier */
import { ProfesorEntity } from '../profesor/profesor.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'; 
@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn('uuid') 
    id: string; 
    
    @Column() 
    titulo: string; 
    
    @Column() 
    descripcion: string; 
    
    @Column() 
    palabra_clave: string; 
    
    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta) 
    @JoinColumn() 
    proyecto: ProyectoEntity; 

    @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas) 
    profesor: ProfesorEntity; 
    
    } 
    
    
