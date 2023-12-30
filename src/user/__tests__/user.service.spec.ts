import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserDtoMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it('should return DB error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined);
    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should return user in findUserById', async () => {
    const user = await service.getUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined);
    expect(service.getUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return DB ERROR in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.getUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return error in create if user exists', async () => {
    expect(service.createUser(createUserDtoMock)).rejects.toThrow();
  });

  it('should create user if not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined);

    const user = await service.createUser(createUserDtoMock);
    expect(user).toEqual(userEntityMock);
  });
});
