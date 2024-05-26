/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/typeorm-testing-config';


describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesoresList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     
      imports: [...TypeOrmTestingConfig()],
            providers: [
        ProfesorService,
      
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesoresList = [];
    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await repository.save({
        nombre: faker.person.firstName(),
        grupo_investigacion: 'TICSW',
        num_extension: faker.number.int(),
        cedula: faker.number.int(),
        propuestas: [],
      });
      profesoresList.push(profesor);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all profesors', async () => {
    const profesors: ProfesorEntity[] = await service.findAll();
    expect(profesors).toHaveLength(profesoresList.length);
  });

  it('findOne should return a profesor by id', async () => {
    const storedProfesor: ProfesorEntity = profesoresList[0];
    const profesor: ProfesorEntity = await service.findOne(storedProfesor.id);
    expect(profesor).toEqual(storedProfesor);
  });

  it('findOne should throw an exception for an invalid profesor', async () => {
    await expect(service.findOne("invalid-id")).rejects.toHaveProperty("message", "The profesor with the given id was not found");
  });

  it('create should return a new profesor', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      nombre: faker.person.firstName(),
      grupo_investigacion: 'TICSW',
      num_extension: faker.number.int(),
      cedula: 1021392170,
      propuestas: [],
    };

    const newProfesor: ProfesorEntity = await service.create(profesor);
    expect(newProfesor).not.toBeNull();

    const storedProfesor: ProfesorEntity = await repository.findOne({ where: { id: newProfesor.id } });
    expect(storedProfesor.nombre).toEqual(newProfesor.nombre);
    expect(storedProfesor.cedula).toEqual(newProfesor.cedula);
    expect(storedProfesor.num_extension).toEqual(newProfesor.num_extension);
    expect(storedProfesor.grupo_investigacion).toEqual(newProfesor.grupo_investigacion);

    
  });

  it('create should throw an exception if grupo_investigacion is not allowed', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      nombre: faker.person.firstName(),
      grupo_investigacion: "INVALID_GROUP",
      num_extension: faker.number.int(),
      cedula: faker.number.int(),
      propuestas: [],
    };
    await expect(service.create(profesor)).rejects.toHaveProperty("message","El grupo asignado no es permitido");
  });

  it('delete should remove a profesor by id', async () => {
    const profesor: ProfesorEntity = profesoresList[0];
    await service.delete(profesor.id);
    const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { id: profesor.id } });
    expect(deletedProfesor).toBeNull();
  });

  it('delete should throw an exception for an invalid profesor', async () => {
    await expect(service.delete("invalid-id")).rejects.toHaveProperty("message","El profesor con el id proporcionado no se encontró");
  });

  it('deleteByCedula should remove a profesor by cedula', async () => {
    const profesor: ProfesorEntity = profesoresList[0];
    await service.deleteByCedula(profesor.cedula);
    const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { cedula: profesor.cedula } });
    expect(deletedProfesor).toBeNull();
  });

  it('deleteByCedula should throw an exception for an invalid profesor', async () => {
    await expect(service.deleteByCedula(0)).rejects.toHaveProperty("message","El profesor con la cédula proporcionada no se encontró");
  });

});
