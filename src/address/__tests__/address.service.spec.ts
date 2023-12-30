import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { addressMock } from '../__mocks__/address.mock';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressDtoMock } from '../__mocks__/createAddress.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            getCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );

    userService = module.get<UserService>(UserService);

    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return addres after save', async () => {
    const address = await service.createAddress(
      createAddressDtoMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressMock);
  });

  it('should return error if has exception in userService', async () => {
    jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createAddressDtoMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error if has exception in cityService', async () => {
    jest.spyOn(cityService, 'getCityById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createAddressDtoMock, userEntityMock.id),
    ).rejects.toThrow();
  });
});
