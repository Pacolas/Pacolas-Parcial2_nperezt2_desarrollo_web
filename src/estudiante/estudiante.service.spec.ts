/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        EstudianteService,
        
      ],
    }).compile();
 
    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new estudiante', async () => {
      const estudiante: EstudianteEntity = {
        id: '',
        codigo: faker.number.int({ min: 1000000000, max: 9999999999 }),
        proyecto: null,
        nombre: faker.person.fullName(),
        creditos: faker.number.int()
      };

      const newEstudiante: EstudianteEntity = await service.create(estudiante);
      expect(newEstudiante).toBeDefined(); 

      const foundEstudiante: EstudianteEntity = await repository.findOne({ where: { id: newEstudiante.id } });
      expect(foundEstudiante.id).toEqual(estudiante.id);
      expect(foundEstudiante.codigo).toEqual(estudiante.codigo);
      expect(foundEstudiante.nombre).toEqual(estudiante.nombre);
    
    });

    it('should throw an exception if estudiante code is not valid', async () => {
      const estudiante: EstudianteEntity = {
        id: '',
        nombre:faker.person.firstName(),
        codigo: faker.number.int({ min: 0, max: 123 }),
        proyecto: null,
        creditos:123
      };

      await expect(service.create(estudiante)).rejects.toHaveProperty("message","The estudiante code is not valid.");
    });
  });

  describe('findOne', () => {
    it('should return an estudiante by id', async () => {
      const estudiante: EstudianteEntity = {
        id: '1',
        nombre:faker.person.firstName(),
        codigo: faker.number.int({ min: 123, max: 124 }),
        proyecto: null,
        creditos:123
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(estudiante);

      const foundEstudiante: EstudianteEntity = await service.findOne(estudiante.id);
      expect(foundEstudiante.id).toEqual(estudiante.id);
      expect(foundEstudiante.codigo).toEqual(estudiante.codigo);
      expect(foundEstudiante.nombre).toEqual(estudiante.nombre);
    });

    it('should throw an exception if estudiante is not found', async () => {
      await expect(service.findOne('invalid-id')).rejects.toHaveProperty("message","The estudiante with the given id was not found");
    });
  });
});
