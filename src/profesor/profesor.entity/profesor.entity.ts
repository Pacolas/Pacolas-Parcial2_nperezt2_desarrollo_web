/* eslint-disable prettier/prettier */
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm'; 
@Entity()
export class ProfesorEntity {
@PrimaryGeneratedColumn('uuid') 
id: Long; 

@Column() 
nombre: string; 

@Column() 
grupo_investigacion: string; 

@Column() 
num_extension: number; 

@Column() 
cedula: number; 
 
@OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor) 
propuestas: PropuestaEntity[]; 


} 

