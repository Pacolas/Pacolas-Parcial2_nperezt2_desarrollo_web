/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        ProyectoService, 
        
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new proyecto', async () => {
      const proyecto: ProyectoEntity = {
        id: '1',
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2024-12-31'),
        url: 'http://example.com',
        estudiante: null,
        propuesta: null,
      };

      jest.spyOn(repository, 'save').mockImplementation(async () => proyecto as any);

      const newProyecto: ProyectoEntity = await service.create(proyecto);
      expect(newProyecto).toBeDefined();
      expect(newProyecto).toEqual(proyecto);
    });

    it('should throw an exception if fechaFin is before fechaInicio', async () => {
      const proyecto: ProyectoEntity = {
        id: '1',
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2023-12-31'), 
        url: 'http://nicolas.com',
        estudiante: null,
        propuesta: null,
      };

      await expect(service.create(proyecto)).rejects.toHaveProperty("message","The project ends before it starts")
      
    });
  });

  // Add more test cases for other methods as needed...

});
