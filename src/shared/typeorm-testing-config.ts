/* eslint-disable prettier/prettier */ 

/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/ 

import { TypeOrmModule } from '@nestjs/typeorm'; 
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';


export const TypeOrmTestingConfig = () => [ 

 TypeOrmModule.forRoot({ 

   type: 'sqlite', 
   database: ':memory:', 
   dropSchema: true, 
   entities: [ProyectoEntity, PropuestaEntity, EstudianteEntity, ProfesorEntity], 
   synchronize: true, 
   keepConnectionAlive: true 

 }), 

 TypeOrmModule.forFeature([ProyectoEntity, PropuestaEntity, EstudianteEntity, ProfesorEntity]), 

]; 

/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/ 