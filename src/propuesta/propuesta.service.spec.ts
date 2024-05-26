/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { PropuestaService } from './propuesta.service';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProyectoService } from '../proyecto/proyecto.service';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let propuestasList: PropuestaEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        PropuestaService,
        ProyectoService
      ],
    }).compile();
    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    propuestasList = [];
    for (let i = 0; i < 5; i++) {
      const propuesta: PropuestaEntity = await repository.save({
        titulo: faker.lorem.words(3),
        descripcion: faker.lorem.sentence(),
        palabra_clave: faker.lorem.word(),
    
      });
      propuestasList.push(propuesta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new propuesta', async () => {
      const propuesta: PropuestaEntity = {
        id: '',
        titulo: faker.lorem.words(3),
        descripcion: faker.lorem.sentence(),
        palabra_clave: faker.lorem.word(),
        proyecto: null,
        profesor: null,
      };

      const newPropuesta: PropuestaEntity = await service.create(propuesta);
      expect(newPropuesta).toBeDefined();

      const storedPropuesta: PropuestaEntity = await repository.findOne({ where: { id: newPropuesta.id } });
      expect(storedPropuesta).toBeDefined();
      expect(storedPropuesta.titulo).toEqual(propuesta.titulo);
      expect(storedPropuesta.descripcion).toEqual(propuesta.descripcion);
      expect(storedPropuesta.palabra_clave).toEqual(propuesta.palabra_clave);
    });

    it('should throw an exception if title is empty', async () => {
      const propuesta: PropuestaEntity = {
        id: '',
        titulo: '',
        descripcion: faker.lorem.sentence(),
        palabra_clave: faker.lorem.word(),
        proyecto: null,
        profesor: null,
      };

      await expect(service.create(propuesta)).rejects.toHaveProperty(
        'message',
        'The propuesta title cannot be empty',
      );
    });
  });

  describe('findOne', () => {
    it('should return a propuesta by id', async () => {
      const storedPropuesta: PropuestaEntity = propuestasList[0];
      const propuesta: PropuestaEntity = await service.findOne(storedPropuesta.id);
      expect(propuesta).toBeDefined();
      expect(propuesta.titulo).toEqual(storedPropuesta.titulo);
      expect(propuesta.descripcion).toEqual(storedPropuesta.descripcion);
      expect(propuesta.palabra_clave).toEqual(storedPropuesta.palabra_clave);
    });

    it('should throw an exception if propuesta is not found', async () => {
      await expect(service.findOne('invalid-id')).rejects.toHaveProperty(
        'message',
        'The propuesta with the given id was not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return all propuestas', async () => {
      const propuestas: PropuestaEntity[] = await service.findAll();
      expect(propuestas).toHaveLength(propuestasList.length);
    });
  });

  describe('delete', () => {
    it('should delete a propuesta by id', async () => {
      let propuesta3: PropuestaEntity = await repository.save({
          id: "124",
          titulo: "Nicol",
          descripcion: faker.lorem.sentence(),
          palabra_clave: faker.lorem.word(),
          
      });
  
      await service.delete(propuesta3.id);
      const deletedPropuesta: PropuestaEntity = await repository.findOne({ where: { id: "124" } });
      expect(deletedPropuesta).toBeNull();
  });

    it('should throw an exception if propuesta is not found', async () => {
      await expect(service.delete('invalid-id')).rejects.toHaveProperty(
        'message',
        'The propuesta with the given id was not found',
      );
    });

    // it('should throw an exception if propuesta has an assigned project', async () => {
      
    //   const proyecto2: ProyectoEntity = await repository2.save({
    //     id: '5',
    //     fechaInicio: new Date('2024-01-01'),
    //     fechaFin: new Date('2023-12-31'), 
    //     url: 'http://nicolas.com',
    //     estudiante: null,
    //     propuesta: null,
    //   })
    //   const propuesta: PropuestaEntity = await repository.save({
    //     titulo: faker.lorem.words(6),
    //     descripcion: faker.lorem.sentence(),
    //     palabra_clave: faker.lorem.word(),
    //     proyecto: proyecto2,
    //     profesor: null,
    //   });
    //   propuesta.proyecto = proyecto2;
    //   await expect(service.delete(propuesta.id)).rejects.toHaveProperty(
    //     'message', 'The propuesta cannot be deleted if it has an assigned project.'
    //   );
    // });
  });


});
